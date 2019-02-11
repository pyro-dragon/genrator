import { Component, AfterContentInit } from "@angular/core";
import { Body } from "./Body";
import { BodyColour } from "./BodyColour";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterContentInit {
	body;
	JSON;
	
	constructor() {
		this.JSON = JSON;
	}

	ngAfterContentInit() {

		this.body = new Body(
			"male", // Base
			"spotted", // Coat
			"rounded", // Left Ear
			"rounded", // Right Ear
			"mohawk", // Hair
			"spotted", // Tail
			new BodyColour(
				"#d1c19e", // Body
				"#2b1e04", // Markings
				"#ec8f23", // Hair
				"#0e0901", // Nose
				"#0d5e04", // Eyes
				"#190800"  // Claws
			)
		);
	}
}
