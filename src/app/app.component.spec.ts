import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderModule } from "./components/header/header.module";

describe('AppComponent', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [RouterTestingModule, HeaderModule],
		declarations: [AppComponent]
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'TodoFrontend'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('TodoFrontend');
	});
});
