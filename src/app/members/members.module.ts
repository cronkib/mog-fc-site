import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members.component';
import { FreeCompanyService } from 'src/app/service/free-company.service';

@NgModule({
	declarations: [MembersComponent],
	imports: [
		CommonModule
	],
	providers: [FreeCompanyService],
	exports: [MembersComponent]
})
export class MembersModule { }
