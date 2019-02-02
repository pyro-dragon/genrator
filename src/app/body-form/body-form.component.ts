import { Component, Input, AfterContentInit } from "@angular/core";
import { Body } from "../Body";

@Component({
	selector: "app-body-form",
	templateUrl: "./body-form.component.html",
	styleUrls: ["./body-form.component.css"]
})
export class BodyFormComponent implements AfterContentInit {

	bodyIndex = {
		base: 0, 
		coat: 0, 
		leftEar: 0, 
		rightEar: 0, 
		hair: 0,
		tail: 0
	};

	maleOptions = {
		base: [{dn: "Default (male)", fn: "male"}], 
		coat: [{dn: "Spotted", fn: "spotted"}, {dn: "Striped", fn: "striped"}], 
		leftEar: [{dn: "Rounded", fn: "rounded"}, {dn: "Pointed", fn: "pointed"}, {dn: "Damaged", fn: "damaged"}], 
		rightEar: [{dn: "Rounded", fn: "rounded"}, {dn: "Pointed", fn: "pointed"}, {dn: "Damaged", fn: "damaged"}], 
		hair: [{dn: "Mohawk", fn: "mohawk"}, {dn: "Buzz Cut", fn: "buzzed"}],
		tail: [{dn: "Paintbrush", fn: "spotted"}, {dn: "Bushy", fn: "striped"}]
	};

	femaleOptions = {
		base: [{dn: "Default (female)", fn: "female"}], 
		coat: [{dn: "Spotted", fn: "spotted"}, {dn: "Striped", fn: "striped"}], 
		leftEar: [{dn: "Rounded", fn: "rounded"}, {dn: "Pointed", fn: "pointed"}, {dn: "Damaged", fn: "damaged"}], 
		rightEar: [{dn: "Rounded", fn: "rounded"}, {dn: "Pointed", fn: "pointed"}, {dn: "Damaged", fn: "damaged"}], 
		hair: [{dn: "Ironed", fn: "ironed"}, {dn: "Plaits", fn: "plaits"}],
		tail: [{dn: "Paintbrush", fn: "spotted"}, {dn: "Bushy", fn: "striped"}]
	};

	bodyOptions = [
		{
			displayName: "Male", 
			options: this.maleOptions
		}, 
		{
			displayName: "Female", 
			options: this.femaleOptions
		}
	];

	options = this.maleOptions;
	JSON;

	@Input() body: Body;
	
	constructor() {
		this.JSON = JSON;
	}

	ngAfterContentInit() {
		this.updateBody();
	}

	updateBody() {

		this.body.base = this.options.base[this.bodyIndex.base].fn;
		this.body.coat = this.options.coat[this.bodyIndex.coat].fn;
		this.body.leftEar = this.options.leftEar[this.bodyIndex.leftEar].fn;
		this.body.rightEar = this.options.rightEar[this.bodyIndex.rightEar].fn;
		this.body.hair = this.options.hair[this.bodyIndex.hair].fn;
		this.body.tail = this.options.tail[this.bodyIndex.tail].fn;
	}
}
