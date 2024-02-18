import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from "./pages/tasks-page/tasks-page.component";
import { AppComponent } from "./app.component";

const routes: Routes = [
	{
		path: '',
		component: AppComponent,
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
