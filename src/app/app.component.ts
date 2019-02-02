import { Component } from "@angular/core";
import { Body } from "./Body";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	body = new Body;

	JSON;
	
	constructor() {
		this.JSON = JSON;
	}
}
