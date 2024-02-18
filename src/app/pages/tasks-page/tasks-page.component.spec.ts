import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPageComponent } from './tasks-page.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('TasksPageComponent', () => {
	let component: TasksPageComponent;
	let fixture: ComponentFixture<TasksPageComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TasksPageComponent],
			imports: [HttpClientTestingModule]
		});
		fixture = TestBed.createComponent(TasksPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
