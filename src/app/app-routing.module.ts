import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from "./pages/tasks-page/tasks-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";

const routes: Routes = [
	{
		path: '',
		component: HomePageComponent,
	},
	{
		path: 'tasks',
		component: TasksPageComponent,
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
