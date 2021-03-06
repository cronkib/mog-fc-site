require "net/http"
require "uri"
require "json"
require "logger"

FREECOMPANY_ID = "9234349560946610978"
HOSTNAME = "https://xivapi.com"
LOG_DIR = "logs"
LOG_FILE = "update-job.log"
LOG_PERIOD = "daily"
OUTPUT_DIR = "output"
OUTPUT_FILE = "freecompany.json"

module Log
    @@logs = []

    def log_start(logdir, logfile, period)
        Dir.mkdir(logdir) unless Dir.exists? logdir

        @@logs = [
            Logger.new("#{logdir}/#{logfile}", period, datetime_format: "%Y-%m-%d %H:%M:%S"),
            Logger.new(STDOUT, datetime_format: "%Y-%m-%d %H:%M:%S")
        ]
    end

    def log_info(message)
        log_append(Logger::INFO, message)
    end

    def log_error(message)
        log_append(Logger::ERROR, message)
    end

    def log_append(level, message)
        @@logs.each do |l|
            l.add(level, message)
        end
    end

    def log_stop 
        @@logs.each do |l|
            l.close
        end
    end
end

class XivApiClient
    @@STATUS_GOOD = "200"
    @@CONTENT_TYPE = "Content-Type"
    @@APPLICATION_JSON = "application/json"

    include Log

    def initialize(hostname)
        @hostname = hostname
    end

    def get_freecompany(id)
        log_info "Retrieving Free Company"
        FreeCompany.new get_body("/freecompany/#{id}?data=FCM")
    end

    def get_player(id)
        Player.new get_body("/character/#{id}?data=CJ")
    end

    protected

    def get_body(path)
        uri = URI("#{@hostname}#{path}")
        log_info "GET: #{uri}"
        response = Net::HTTP.get_response(uri)

        if response.code == @@STATUS_GOOD
            begin
                JSON.parse response.body
            rescue JSON::ParserError
                {}
            end
        else
            log_error "Invalid Response Status"
            {}
        end
    end
end

class FreeCompany
    @@FREE_COMPANY_KEY = "FreeCompany"
    @@FREE_COMPANY_MEMBERS_KEY = "FreeCompanyMembers"

    def initialize(data = {})
        @data = data
    end
    
    attr_accessor :data

    def empty?
        @data.empty? || name.empty? || freecompany_members.empty? 
    end

    def name
        fc = @data[@@FREE_COMPANY_KEY]
        
        if fc.nil?
            return ""
        end
        
        name = fc["Name"]

        if name.nil?
            return ""
        end

        name
    end

    def freecompany_members 
        members = @data[@@FREE_COMPANY_MEMBERS_KEY]

        if members.nil?
            []
        else
            members
        end
    end

    def each_member(&block)
        members = freecompany_members

        members.each do |m|
            unless block.nil?
                block.call m["ID"], m
            end
        end
    end
end

class Player 
    def initialize(data = {})
        @data = data
    end

    attr_accessor :data
end

class FullCompanyDetail
    def initialize(company, members)
        @data = {
            Company: company,
            Members: members
        }
    end

    attr_accessor :data
end

class UpdateJob
    include Log

    def initialize(hostname, **options)
        @client = XivApiClient.new hostname
        @log_dir = options[:log_dir]
        @log_file = options[:log_file]
        @log_period = options[:log_period]
        @output_dir = options[:output_dir]
        @output_file = options[:output_file]
    end

    def run(freecompany_id)
        log_start(@log_dir, @log_file, @log_period)
        log_info "Starting Update Job"
        company = @client.get_freecompany(freecompany_id)
        members = {}

        if company.empty?
            log_error "FC data is unavailable"
            log_stop
            return
        end

        log_info "FC: #{company.name}"
        log_info "Members: #{company.freecompany_members.length} members"

        log_info "Retrieving Players"
        company.each_member do |id|
            player = @client.get_player id
            members["#{id}"] = player.data
        end

        log_info "Writing file"
        write_json FullCompanyDetail.new(company.data, members).data

        log_info "Done"
        log_stop
    end

    def write_json(data)
        Dir.mkdir(@output_dir) unless Dir.exists? @output_file
        File.open("#{@output_dir}/#{@output_file}", "w") do |file|
            file.write(JSON.pretty_generate(data))
        end
    end
end

job = UpdateJob.new HOSTNAME, 
        log_dir: LOG_DIR, 
        log_file: LOG_FILE, 
        log_period: LOG_PERIOD,
        output_dir: OUTPUT_DIR,
        output_file: OUTPUT_FILE
job.run FREECOMPANY_ID

