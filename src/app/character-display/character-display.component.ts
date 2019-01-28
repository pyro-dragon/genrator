import { Component, Input, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import layout from "../../assets/layout.json";

@Component({
	selector: "app-character-display",
	templateUrl: "./character-display.component.html",
	styleUrls: ["./character-display.component.css"]
})
export class CharacterDisplayComponent implements AfterViewInit {

	@Input() body: {};
	@ViewChild("canvas1") canvas1: ElementRef;
	@ViewChild("canvas2") canvas2: ElementRef;

	constructor() {
		console.log(layout);
	}

	ngAfterViewInit() {
		if (this.canvas1.nativeElement.getContext) {

			let context = this.canvas1.nativeElement.getContext("2d");
			let layer1 = new Image();
			let layer2 = new Image();
			layer1.src = "/assets/Bodies/Female/Body/Base.png";
			layer1.onload = function() {

				layer2.src = "/assets/Bodies/Female/Body/Lines.png";
				layer2.onload = function() {

					context.drawImage(layer1, 0, 0);
					context.globalCompositeOperation = "source-in";
					context.fillStyle = "#eedef7";
					context.fillRect(0, 0 , layer1.width, layer1.height);
					context.globalCompositeOperation = "source-over";
					context.drawImage(layer2, 0, 0);
				};
			};
		}
		else {
			return;
		}

		if (this.canvas2.nativeElement.getContext) {

			let context = this.canvas2.nativeElement.getContext("2d");
			let layer3 = new Image();
			let layer4 = new Image();
			layer3.src = "/assets/Bodies/Female/Hair/Ironed Base.png";
			layer3.onload = function() {

				layer4.src = "/assets/Bodies/Female/Hair/Ironed Lines.png";
				layer4.onload = function() {

					context.drawImage(layer3, 0, 0);
					context.globalCompositeOperation = "source-in";
					context.fillStyle = "#ffdeee";
					context.fillRect(0, 0 , layer3.width, layer3.height);
					context.globalCompositeOperation = "source-over";
					context.drawImage(layer4, 0, 0);
				};
				
			};
		}
		else {
			return;
		}
	}
}