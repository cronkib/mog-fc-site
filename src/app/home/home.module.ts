import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FreeCompanyService } from '../service/free-company.service';

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule
	],
	providers: [FreeCompanyService],
	exports: [HomeComponent]
})
export class HomeModule { }
