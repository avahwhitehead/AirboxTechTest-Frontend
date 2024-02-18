import { Component, TemplateRef } from '@angular/core';
import { Task, TaskBase, TasksService } from 'src/app/services/tasks.service';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
	selector: 'app-tasks-page',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent {
	tasks: Task[];

	editingTask?: Task;
	modalRef?: NgbModalRef;

	formGroup: FormGroup = new FormGroup<any>({
		'priority': new FormControl(),
		'task-status': new FormControl(),
		'assigned-to': new FormControl(),
		'task-summary': new FormControl(),
	});

	constructor(
		private tasksService: TasksService,
		private modalService: NgbModal,
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

	saveTaskClick(e: MouseEvent) {
		let taskId = this.editingTask?.taskId;

		let task: Task = {
			taskId: taskId!,
			priority: this.formGroup.get('priority')!.value,
			taskStatus: this.formGroup.get('task-status')!.value,
			assignedTo: this.formGroup.get('assigned-to')!.value,
			taskSummary: this.formGroup.get('task-summary')!.value,
		}

		if (taskId === -1) {
			this.createTask(task);
		} else {
			this.saveTask(task);
		}
	}

	private saveTask(task: Task) {
		let taskId = task.taskId;

		this.tasksService.updateTask(this.editingTask?.taskId!, task).subscribe((createdTask) => {
			let index = this.tasks.findIndex(t => t.taskId === taskId);
			if (index < 0) {
				console.warn("Couldn't find task with id", taskId);
				return;
			}

			this.tasks[index] = createdTask;

			this.modalService.dismissAll();
			this.modalRef?.close();
		});
	}

	private createTask(task: Task) {
		this.tasksService.createTasks([task]).subscribe((createdTasks) => {
			let createdTask = createdTasks[0];

			this.tasks.push(createdTask);

			this.modalService.dismissAll();
			this.modalRef?.close();
		});
	}

	openModal(modal: TemplateRef<any>, taskId: number) {
		//Find the task object
		let task: Task | undefined;
		if (taskId === -1) {
			task = {
				taskId: -1,
				taskStatus: '',
				assignedTo: '',
				priority: 'UNASSIGNED',
				taskSummary: '',
			}
			this.editingTask = task;
		} else {
			task = this.tasks.find(t => t.taskId === taskId);
			this.editingTask = task;
		}

		//Update the form group
		this.formGroup.patchValue({
			'priority': task?.priority,
			'task-status': task?.taskStatus,
			'assigned-to': task?.assignedTo,
			'task-summary': task?.taskSummary,
		})

		//Open the modal
		this.modalRef = this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' });
	}
}
