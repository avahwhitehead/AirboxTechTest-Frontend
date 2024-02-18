import { Component } from '@angular/core';
import { Task } from 'src/app/services/tasks.service';

@Component({
	selector: 'app-tasks-page',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent {
	tasks: Task[] = [
		{
			taskId: 1,
			priority: "LOW",
			taskStatus: "In Progress",
			assignedTo: "User1",
			taskSummary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ante euismod, rhoncus mauris non, facilisis mauris. Praesent in tellus risus. Ut euismod sapien eu tincidunt efficitur."
		},
		{
			taskId: 2,
			priority: "HIGH",
			taskStatus: "To Do",
			assignedTo: "User2",
			taskSummary: "Donec sit amet semper velit. Nulla tincidunt luctus porttitor. Nam vitae ante quis ipsum tincidunt sagittis. Suspendisse potenti. In porttitor lectus nibh, ut venenatis purus commodo a. "
		},
		{
			taskId: 3,
			priority: "MEDIUM",
			taskStatus: "Done",
			assignedTo: "User1",
			taskSummary: "Etiam vestibulum luctus urna eu mollis. Aliquam vitae purus vitae mi efficitur dignissim eu ac risus. Fusce facilisis enim vel faucibus interdum."
		},
	];
}
