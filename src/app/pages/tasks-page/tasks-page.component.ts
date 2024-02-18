import { Component } from '@angular/core';
import { Task, TasksService } from 'src/app/services/tasks.service';

@Component({
	selector: 'app-tasks-page',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent {
	tasks: Task[];

	constructor(
		private tasksService: TasksService,
	) {
		//Initialise the tasks list
		this.tasks = [];

		//Get a list of all the tasks
		this.tasksService.getTasks()
			.subscribe(t => this.tasks = t);
	}
}
