import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterLink } from "@angular/router";


@NgModule({
	declarations: [
		HomePageComponent
	],
	imports: [
		CommonModule,
		RouterLink
	]
})
export class HomePageModule {
}
