import { Component, Input } from "@angular/core";

@Component({
	selector: "app-body-form",
	templateUrl: "./body-form.component.html",
	styleUrls: ["./body-form.component.css"]
})
export class BodyFormComponent {

	options;

	maleChoices = {
		base: [{dn: "Default (male)", fn: "male.png"}], 
		coat: [{dn: "Spotted", fn: "spotted.png"}, {dn: "Striped", fn: "striped.png"}], 
		leftEar: [{dn: "Rounded", fn: "rounded.png"}, {dn: "Pointed", fn: "pointed.png"}, {dn: "Damaged", fn: "damaged.png"}], 
		rightEar: [{dn: "Rounded", fn: "rounded.png"}, {dn: "Pointed", fn: "pointed.png"}, {dn: "Damaged", fn: "damaged.png"}], 
		hair: [{dn: "Spiked", fn: "spiked.png"}, {dn: "Buzz Cut", fn: "buzzed.png"}]
	};

	femaleChoices = {
		base: [{dn: "Default (female)", fn: "female.png"}], 
		coat: [{dn: "Spotted", fn: "spotted.png"}, {dn: "Striped", fn: "striped.png"}], 
		leftEar: [{dn: "Rounded", fn: "rounded.png"}, {dn: "Pointed", fn: "pointed.png"}, {dn: "Damaged", fn: "damaged.png"}], 
		rightEar: [{dn: "Rounded", fn: "rounded.png"}, {dn: "Pointed", fn: "pointed.png"}, {dn: "Damaged", fn: "damaged.png"}], 
		hair: [{dn: "Spiked", fn: "spiked.png"}, {dn: "Flowing", fn: "flowing.png"}]
	};

	bodyChoices = [
		{
			displayName: "Male", 
			choices: this.maleChoices
		}, 
		{
			displayName: "Female", 
			choices: this.femaleChoices
		}
	];
	
	bodyMap;
	JSON;

	@Input() body: {};
	
	constructor() {

		this.JSON = JSON;
	}

	public changeOption(event: any): void {
		console.log(event);
	}
}
