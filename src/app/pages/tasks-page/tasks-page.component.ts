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

	deleteTaskClick(e: MouseEvent, taskId: number) {
		if (!confirm("Are you sure you want to delete task " + taskId + "?")) {
			return;
		}

		this.tasksService.deleteTask(taskId).subscribe(() => {
			let index = this.tasks.findIndex(t => t.taskId === taskId);
			if (index < 0) {
				console.warn("Couldn't find task with id", taskId);
				return;
			}

			this.tasks.splice(index, 1);
		});
	}
}
