import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
	providedIn: 'root'
})
export class TasksService {
	constructor(
		private httpClient: HttpClient,
	) {}

	/**
	 * Fetch a list of all the tasks from the server
	 * @returns {Observable<Task[]>} Observable containing the list of tasks
	 */
	public getTasks(): Observable<Task[]> {
		return this.httpClient.get<TaskResponse[]>("/api/tasks")
			.pipe(
				//Automatically clean up any listeners
				takeUntilDestroyed(),
				//Convert the tasks from the api response format to a cleaner format
				map(this.arrayMap(this.TaskResponseToTask)),
			);
	}

	/**
	 * Get a specific task frm the server
	 * @param id Id of the task
	 * @returns {Observable<Task>} Observable containing the task
	 */
	public getTask(id: number): Observable<Task> {
		return this.httpClient.get<TaskResponse>("/api/tasks")
			.pipe(
				//Automatically clean up any listeners
				takeUntilDestroyed(),
				//Convert the task from the api response format to a cleaner format
				map(this.TaskResponseToTask),
			);
	}

	/**
	 * Create a set of tasks
	 * @param tasks List of tasks to create
	 * @returns {Observable<Task[]>} Observable containing the list of created tasks
	 */
	public createTasks(tasks: Task[]): Observable<Task[]> {
		let taskResponses = tasks.map(this.TaskToTaskResponse);

		return this.httpClient.post<TaskResponse[]>("/api/tasks", taskResponses)
			.pipe(
				//Automatically clean up any listeners
				takeUntilDestroyed(),
				//Convert the tasks from the api response format to a cleaner format
				map(this.arrayMap(this.TaskResponseToTask)),
			);
	}

	/**
	 * Get a list of all the tasks from the server
	 * @returns {Observable<Task[]>} Observable containing the list of tasks
	 */
	public updateTask(id: number, task: Task): Observable<Task> {
		let taskResponse = this.TaskToTaskResponse(task);
		return this.httpClient.put<TaskResponse>(`/api/tasks/${id}`, taskResponse)
			.pipe(
				//Automatically clean up any listeners
				takeUntilDestroyed(),
				//Convert the task from the api response format to a cleaner format
				map(this.TaskResponseToTask),
			);
	}

	/**
	 * Get a list of all the tasks from the server
	 * @returns {Observable<Task[]>} Observable containing the list of tasks
	 */
	public deleteTask(id: number): Observable<void> {
		return this.httpClient.delete<void>(`/api/tasks/${id}`)
			.pipe(
				//Automatically clean up any listeners
				takeUntilDestroyed(),
			);
	}

	/**
	 * Simple map function to apply a transformation function to every element of a list.
	 * Sits in a pipe's map call
	 * @param f The transformation function to call against each element in the list
	 * @private
	 */
	private arrayMap<T,S>(f: (v: T, i: number) => S): (V: T[]) => S[] {
		return (v: T[]): S[] => v.map(f)
	}

	/**
	 * Convert a `TaskResponse` object to a `Task`
	 * @param task   The task response object to convert
	 * @returns An object representing the input task, in a format usable by the frontend
	 * @private
	 */
	private TaskResponseToTask(task: TaskResponse): Task {
		return {
			taskId: task.taskId,
			priority: task.priority,
			taskStatus: task.taskStatus,
			assignedTo: task.assignedto,
			taskSummary: task.tasksummary,
		};
	}

	/**
	 * Convert a `Task` object to a `TaskResponse`
	 * @param task   The task object to convert
	 * @returns An object representing the input task, in a format usable by the API
	 * @private
	 */
	private TaskToTaskResponse(task: Task): TaskResponse {
		return {
			taskId: task.taskId,
			priority: task.priority,
			taskStatus: task.taskStatus,
			assignedto: task.assignedTo,
			tasksummary: task.taskSummary,
		};
	}
}

/**
 * Represents a task created by the user.
 * Equivalent to {@see TaskResponse} but conforms to TypeScript casing.
 */
export interface Task {
	taskId: number;
	priority: 'LOW'|'MEDIUM'|'HIGH'|'UNASSIGNED';
	taskStatus: string;
	assignedTo: string;
	taskSummary: string;
}

/**
 * A task, in the format required by the API.
 */
interface TaskResponse {
	taskId: number;
	priority: 'LOW'|'MEDIUM'|'HIGH'|'UNASSIGNED';
	taskStatus: string;
	assignedto: string;
	tasksummary: string;
}
