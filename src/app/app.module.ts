import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FreeCompanyService } from './service/free-company.service';
import { HttpClientModule } from "@angular/common/http";
import { MembersModule } from './members/members.module';
import { HomeModule } from './home/home.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		HomeModule,
		MembersModule
	],
	providers: [FreeCompanyService],
	bootstrap: [AppComponent]
})
export class AppModule { 

}
