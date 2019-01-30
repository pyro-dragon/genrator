import { Component, Input, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import layout from "../../assets/layout.json";
declare var Caman: any;

@Component({
	selector: "app-character-display",
	templateUrl: "./character-display.component.html",
	styleUrls: ["./character-display.component.css"]
})
export class CharacterDisplayComponent implements AfterViewInit {

	@Input() body: {};
	@ViewChild("bodyColour") bodyColour: ElementRef;
	@ViewChild("bodyLines") bodyLines: ElementRef;
	@ViewChild("hairColour") hairColour: ElementRef;
	@ViewChild("hairLines") hairLines: ElementRef;
	@ViewChild("leftEarColour") leftEarColour: ElementRef;
	@ViewChild("leftEarLines") leftEarLines: ElementRef;
	@ViewChild("rightEarColor") rightEarColor: ElementRef;
	@ViewChild("rightEarLines") rightEarLines: ElementRef;
	@ViewChild("tailColour") tailColour: ElementRef;
	@ViewChild("tailLines") tailLines: ElementRef;

	baseColour = "#d1c19e";
	markingsColour = "#2b1e04";
	maneColour = "#ec8f23";
	lineColour = "#000000";

	constructor() {
		console.log(layout);
	}

	ngAfterViewInit() {
		
		Caman(this.bodyColour.nativeElement, "/assets/Bodies/Female/Body/Base.png", function () {
			this.newLayer(function(){
				this.fillColor("#d1c19e");
				this.newLayer(function(){
					this.overlayImage("/assets/Bodies/Female/Body/Spotted Markings.png");
					this.newLayer(function(){
						this.fillColor("#2b1e04");
					});
				});
				this.newLayer(function(){
					this.overlayImage("/assets/Bodies/Female/Body/Nose.png");
					this.newLayer(function(){
						this.fillColor("#0e0901");
					});
				});
			});
			this.render();
		  });

		Caman(this.bodyLines.nativeElement, "/assets/Bodies/Female/Body/Lines.png", function () {
			this.newLayer(function(){
				this.setBlendingMode("normal");
				this.fillColor("#000000");
			});
			this.render();
		});

		Caman(this.hairColour.nativeElement, "/assets/Bodies/Female/Hair/Ironed Base.png", function () {
			this.newLayer(function(){
				this.setBlendingMode("normal");
				this.fillColor("#ec8f23");
			});
			this.render();
		});

		Caman(this.hairLines.nativeElement, "/assets/Bodies/Female/Hair/Ironed Lines.png", function () {
			this.newLayer(function(){
				this.setBlendingMode("normal");
				this.fillColor("#000000");
			});
			this.render();
		});

		Caman(this.leftEarColour.nativeElement, "/assets/Bodies/Female/Left Ear/Rounded Base.png", function () {
			this.newLayer(function(){
				this.setBlendingMode("normal");
				this.fillColor("#d1c19e");
			});
			this.render();
		});

		Caman(this.leftEarLines.nativeElement, "/assets/Bodies/Female/Left Ear/Rounded Lines.png", function () {
			this.newLayer(function(){
				this.setBlendingMode("normal");
				this.fillColor("#000000");
			});
			this.render();
		});

		Caman(this.rightEarColor.nativeElement, "/assets/Bodies/Female/Right Ear/Rounded Base.png", function () {
			this.newLayer(function(){
				this.setBlendingMode("normal");
				this.fillColor("#d1c19e");
			});
			this.render();
		});

		Caman(this.rightEarLines.nativeElement, "/assets/Bodies/Female/Right Ear/Rounded Lines.png", function () {
			this.newLayer(function(){
				this.setBlendingMode("normal");
				this.fillColor("#000000");
			});
			this.render();
		});

		Caman(this.tailColour.nativeElement, "/assets/Bodies/Female/Tail/Spotted Base.png", function () {
			this.newLayer(function(){
				this.setBlendingMode("normal");
				this.fillColor("#d1c19e");
				this.newLayer(function(){
					this.overlayImage("/assets/Bodies/Female/Tail/Spotted Markings.png");
					this.newLayer(function(){
						this.fillColor("#2b1e04");
					});
				});
			});
			this.render();
		});

		Caman(this.tailLines.nativeElement, "/assets/Bodies/Female/Tail/Spotted Lines.png", function () {
			this.newLayer(function(){
				this.setBlendingMode("normal");
				this.fillColor("#000000");
			});
			this.render();
		});
	}
}
