import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderModule } from "./components/header/header.module";
import { TasksPageModule } from "./pages/tasks-page/tasks-page.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		HeaderModule,
		TasksPageModule,
	],
	providers: [
		importProvidersFrom(HttpClientModule)
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
