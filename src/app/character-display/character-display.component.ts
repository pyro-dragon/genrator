import { Component, Input, ViewChild, ElementRef, AfterViewInit, SimpleChanges, KeyValueDiffers } from "@angular/core";
import layout from "../../assets/layout.json";
import { Body } from "../Body";
declare var Caman: any;

@Component({
	selector: "app-character-display",
	templateUrl: "./character-display.component.html",
	styleUrls: ["./character-display.component.css"]
})
export class CharacterDisplayComponent implements AfterViewInit {

	@Input() body: Body;
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

	imageMap = {
		root: "/assets/Bodies/",
		base: {
			male: "Male/", 
			female: "Female/"
		}, 
		coat: {
			lines: "Body/Lines.png", 
			colourBase: "Body/Base.png", 
			markingsBase: {
				spotted: "Body/Spotted Markings.png",
				striped: "Body/Striped Markings.png"
			},
			nose: "Body/Nose.png", 
		}, 
		leftEar: {
			pointed: {
				lines: "Left Ear/Pointed Lines.png", 
				colourBase: "Left Ear/Pointed Base.png"
			}, 
			rounded: {
				lines: "Left Ear/Rounded Lines.png", 
				colourBase: "Left Ear/Rounded Base.png"
			}, 
			damaged: {
				lines: "Left Ear/Damaged Lines.png", 
				colourBase: "Left Ear/Damaged Base.png"
			}
		}, 
		rightEar: {
			pointed: {
				lines: "Right Ear/Pointed Lines.png", 
				colourBase: "Right Ear/Pointed Base.png"
			}, 
			rounded: {
				lines: "Right Ear/Rounded Lines.png", 
				colourBase: "Right Ear/Rounded Base.png"
			}, 
			damaged: {
				lines: "Right Ear/Damaged Lines.png", 
				colourBase: "Right Ear/Damaged Base.png"
			}
		}, 
		hair: {
			ironed: {
				lines: "Hair/Ironed Lines.png", 
				colourBase: "Hair/Ironed Base.png"
			}, 
			plaits: {
				lines: "Hair/Plaits Lines.png", 
				colourBase: "Hair/Plaits Base.png"
			}, 
			buzzed: {
				lines: "Hair/Buzzed Lines.png", 
				colourBase: "Hair/Buzzed Base.png"
			}, 
			mohawk: {
				lines: "Hair/Mohawk Lines.png", 
				colourBase: "Hair/Mohawk Base.png"
			}
		}, 
		tail: {
			spotted: {
				lines: "Tail/Spotted Lines.png", 
				colourBase: "Tail/Spotted Base.png",
				markingsBase: "Tail/Spotted Markings.png"
			}, 
			striped: {
				lines: "Tail/Striped Lines.png", 
				colourBase: "Tail/Striped Base.png",
				markingsBase: "Tail/Striped Markings.png"
			}
		}
	};

	JSON;
	differ;

	constructor(differs: KeyValueDiffers) {
		this.JSON = JSON;
		this.differ = differs.find({}).create();
	}

	ngOnChanges(changes: SimpleChanges) { 
		this.render();
	}

	ngDoCheck() {
		var changes = this.differ.diff(this.body); // check for changes
		if (changes) {
		  // do something if changes were found
		  this.render();
		}
	  }	

	ngAfterViewInit() {
		//this.render();
	}

	render() {

		let prefabRoot = this.imageMap.root + this.imageMap.base[this.body.base];
		let coatBase = prefabRoot + this.imageMap.coat.colourBase;
		let markingsBase = prefabRoot + this.imageMap.coat.markingsBase[this.body.coat];
		let nose = prefabRoot + this.imageMap.coat.nose;
		let baseLines = prefabRoot + this.imageMap.coat.lines;

		Caman(
			this.bodyColour.nativeElement, 
			coatBase, 
			function () {
			this.newLayer(function(){
				this.fillColor("#d1c19e");
				this.newLayer(function(){
					this.overlayImage(markingsBase);
					this.newLayer(function(){
						this.fillColor("#2b1e04");
					});
				});
				this.newLayer(function(){
					this.overlayImage(nose);
					this.newLayer(function(){
						this.fillColor("#0e0901");
					});
				});
			});
			this.render();
		  });

		Caman(this.bodyLines.nativeElement, baseLines, function () {
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
