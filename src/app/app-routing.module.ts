import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
	{
		path: "home",
		component: HomeComponent,
		pathMatch: "full"
	},
	{
		path: "",
		redirectTo: "/home",
		pathMatch: "full"
	},
	{
		path: "members",
		component: MembersComponent,
		pathMatch: "full"
	},
	{
		path: "events",
		component: EventsComponent,
		pathMatch: "full"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
