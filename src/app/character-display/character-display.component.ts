import { Component, Input, ViewChild, ElementRef, KeyValueDiffers, DoCheck } from "@angular/core";
import layout from "../../assets/layout.json";
import { Body } from "../Body";
declare var Caman: any;

@Component({
	selector: "app-character-display",
	templateUrl: "./character-display.component.html",
	styleUrls: ["./character-display.component.css"]
})
export class CharacterDisplayComponent implements DoCheck {

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

	ngDoCheck() {
		const changes = this.differ.diff(this.body); // check for changes
		if (changes) {
			// do something if changes were found
			this.render();
			changes.forEachChangedItem((change) => {
				console.log(change);
			});
		}
	}

	render() {

		const prefabRoot = this.imageMap.root + this.imageMap.base[this.body.base];
		const coatBase = prefabRoot + this.imageMap.coat.colourBase;
		const markingsBase = prefabRoot + this.imageMap.coat.markingsBase[this.body.coat];
		const nose = prefabRoot + this.imageMap.coat.nose;
		const baseLines = prefabRoot + this.imageMap.coat.lines;
		const hairBase = this.body.hair ? prefabRoot + this.imageMap.hair[this.body.hair].colourBase : "";
		const hairLines = this.body.hair ? prefabRoot + this.imageMap.hair[this.body.hair].lines : "";
		const leftEarBase = this.body.leftEar ? prefabRoot + this.imageMap.leftEar[this.body.leftEar].colourBase : "";
		const leftEarLines = this.body.leftEar ? prefabRoot + this.imageMap.leftEar[this.body.leftEar].lines : "";
		const rightEarBase = this.body.rightEar ? prefabRoot + this.imageMap.rightEar[this.body.rightEar].colourBase : "";
		const rightEarLines = this.body.rightEar ?  prefabRoot + this.imageMap.rightEar[this.body.rightEar].lines : "";
		const tailBase = this.body.tail ? prefabRoot + this.imageMap.tail[this.body.tail].colourBase : "";
		const tailMarkings = this.body.tail ? prefabRoot + this.imageMap.tail[this.body.tail].markingsBase : "";
		const tailLines = this.body.tail ? prefabRoot + this.imageMap.tail[this.body.tail].lines : "";

		this.bodyColour.nativeElement.removeAttribute("data-caman-id");
		Caman(this.bodyColour.nativeElement, coatBase, function () {
			this.newLayer(function() {
				this.fillColor("#d1c19e");
				this.newLayer(function() {
					this.overlayImage(markingsBase);
					this.newLayer(function() {
						this.fillColor("#2b1e04");
					});
				});

				this.newLayer(function() {
					this.overlayImage(nose);
					this.newLayer(function() {
						this.fillColor("#0e0901");
					});
				});
			});

			this.render();
		});

		this.bodyLines.nativeElement.removeAttribute("data-caman-id");
		Caman(this.bodyLines.nativeElement, baseLines, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor("#000000");
			});

			this.render();
		});

		this.hairColour.nativeElement.removeAttribute("data-caman-id");
		Caman(this.hairColour.nativeElement, hairBase, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor("#ec8f23");
			});

			this.render();
		});

		this.hairLines.nativeElement.removeAttribute("data-caman-id");
		Caman(this.hairLines.nativeElement, hairLines, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor("#000000");
			});

			this.render();
		});

		this.rightEarColor.nativeElement.removeAttribute("data-caman-id");
		Caman(this.rightEarColor.nativeElement, rightEarBase, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor("#d1c19e");
			});

			this.render();
		});

		this.rightEarLines.nativeElement.removeAttribute("data-caman-id");
		Caman(this.rightEarLines.nativeElement, rightEarLines, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor("#000000");
			});

			this.render();
		});

		this.leftEarColour.nativeElement.removeAttribute("data-caman-id");
		Caman(this.leftEarColour.nativeElement, leftEarBase, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor("#d1c19e");
			});

			this.render();
		});

		this.leftEarLines.nativeElement.removeAttribute("data-caman-id");
		Caman(this.leftEarLines.nativeElement, leftEarLines, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor("#000000");
			});

			this.render();
		});

		this.tailColour.nativeElement.removeAttribute("data-caman-id");
		Caman(this.tailColour.nativeElement, tailBase, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor("#d1c19e");
				this.newLayer(function() {
					this.overlayImage(tailMarkings);
					this.newLayer(function() {
						this.fillColor("#2b1e04");
					});
				});
			});

			this.render();
		});

		this.tailLines.nativeElement.removeAttribute("data-caman-id");
		Caman(this.tailLines.nativeElement, tailLines, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor("#000000");
			});

			this.render();
		});
	}
}
