import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPageComponent } from './tasks-page.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
	declarations: [
		TasksPageComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule
	]
})
export class TasksPageModule {
}
