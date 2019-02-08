import { Component, Input, ViewChild, ElementRef, KeyValueDiffers, DoCheck } from "@angular/core";
import layout from "../../assets/layout.json";
import { Body } from "../Body";
import { combineLatest } from 'rxjs';
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

	// Create an invisible canvas to hold the combined layers
	canvasCollection = {
		bodyColour: document.createElement("bodyColour"),
		bodyLines: document.createElement("bodyLines"),
		hairColour: document.createElement("hairColour"),
		hairLines: document.createElement("hairLines"),
		leftEarColour: document.createElement("leftEarColour"),
		leftEarLines: document.createElement("leftEarLines"),
		rightEarColor: document.createElement("rightEarColor"),
		rightEarLines: document.createElement("tailColour"),
		tailColour: document.createElement("bodyColour"),
		tailLines: document.createElement("tailLines")
	};

	height = 800;
	width = 365;

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
			claws: "Body/Claws.png"
		}, 
		eyes: {
			whites: "Eyes/Whites.png", 
			iris: "Eyes/Iris.png", 
			pupils: "Eyes/Pupils.png"
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
	colourDiffer;
	combinedSource = "/assets/layer1.png";

	constructor(differs: KeyValueDiffers) {
		this.JSON = JSON;
		this.differ = differs.find({}).create();
		this.colourDiffer = differs.find({}).create();

		for (let canvasName in this.canvasCollection) {
			this.canvasCollection[canvasName].height = this.bodyColour.nativeElement.height;
			this.canvasCollection[canvasName].width = this.bodyColour.nativeElement.width;
		}
	}

	ngDoCheck() {
		const changes = this.differ.diff(this.body); // check for changes
		if (changes) {
			// do something if changes were found
			changes.forEachChangedItem((change) => {
				switch (change.key) {
					case "base" : this.renderAll(); break;
					case "coat" : this.renderCoat(); break;
					case "eyes" : this.renderCoat(); break;
					case "leftEar" : this.renderLeftEar(); break;
					case "rightEar" : this.renderRightEar(); break;
					case "hair" : this.renderHair(); break;
					case "tail" : this.renderTail(); break;
					default : this.renderAll();
				}
			});
		}

		const colourChanges = this.colourDiffer.diff(this.body.colour); // check for changes
		if (colourChanges) {
			// do something if changes were found
			colourChanges.forEachChangedItem((change) => {
				switch (change.key) {
					case "body" : this.renderAll(); break;
					case "eyes" : this.renderCoat(); break;
					case "claws" : this.renderCoat(); break;
					case "markings" : this.renderCoat(); this.renderTail(); break;
					case "nose" : this.renderCoat(); break;
					case "hair" : this.renderHair(); break;
					//default : this.renderAll();
				}
			});
		}
	}

	renderCoat() {
		const prefabRoot = this.imageMap.root + this.imageMap.base[this.body.base];
		const coatBase = prefabRoot + this.imageMap.coat.colourBase;
		const markingsBase = prefabRoot + this.imageMap.coat.markingsBase[this.body.coat];
		const claws = prefabRoot + this.imageMap.coat.claws;
		const nose = prefabRoot + this.imageMap.coat.nose;
		const baseLines = prefabRoot + this.imageMap.coat.lines;
		const colours = this.body.colour;
		const eyes = {
			whites: prefabRoot + this.imageMap.eyes.whites,
			iris: prefabRoot + this.imageMap.eyes.iris,
			pupils: prefabRoot + this.imageMap.eyes.pupils
		}

		this.bodyColour.nativeElement.removeAttribute("data-caman-id");
		Caman(this.bodyColour.nativeElement, coatBase, function () {
			this.newLayer(function() {
				this.fillColor(colours.body);
				this.newLayer(function() {
					this.overlayImage(markingsBase);
					this.newLayer(function() {
						this.fillColor(colours.markings);
					});
				});

				this.newLayer(function() {
					this.overlayImage(nose);
					this.newLayer(function() {
						this.fillColor(colours.nose);
					});
				});

				this.newLayer(function() {
					this.overlayImage(eyes.whites);
				});

				this.newLayer(function() {
					this.overlayImage(eyes.iris);
					this.newLayer(function() {
						this.fillColor(colours.eyes);
					});
				});
				this.newLayer(function() {
					this.overlayImage(eyes.pupils);
					this.newLayer(function() {
						this.fillColor("#000000");
					});
				});

				this.newLayer(function() {
					this.overlayImage(claws);
					this.newLayer(function() {
						this.fillColor(colours.claws);
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
	}

	renderLeftEar() {

		const prefabRoot = this.imageMap.root + this.imageMap.base[this.body.base];
		const leftEarBase = this.body.leftEar ? prefabRoot + this.imageMap.leftEar[this.body.leftEar].colourBase : "";
		const leftEarLines = this.body.leftEar ? prefabRoot + this.imageMap.leftEar[this.body.leftEar].lines : "";
		const colours = this.body.colour;

		this.leftEarColour.nativeElement.removeAttribute("data-caman-id");
		Caman(this.leftEarColour.nativeElement, leftEarBase, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor(colours.body);
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
	}

	renderRightEar() {

		const prefabRoot = this.imageMap.root + this.imageMap.base[this.body.base];
		const rightEarBase = this.body.rightEar ? prefabRoot + this.imageMap.rightEar[this.body.rightEar].colourBase : "";
		const rightEarLines = this.body.rightEar ?  prefabRoot + this.imageMap.rightEar[this.body.rightEar].lines : "";
		const colours = this.body.colour;

		this.rightEarColor.nativeElement.removeAttribute("data-caman-id");
		Caman(this.rightEarColor.nativeElement, rightEarBase, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor(colours.body);
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
	}

	renderHair() {

		const prefabRoot = this.imageMap.root + this.imageMap.base[this.body.base];
		const hairBase = this.body.hair ? prefabRoot + this.imageMap.hair[this.body.hair].colourBase : "";
		const hairLines = this.body.hair ? prefabRoot + this.imageMap.hair[this.body.hair].lines : "";
		const colours = this.body.colour;

		this.hairColour.nativeElement.removeAttribute("data-caman-id");
		Caman(this.hairColour.nativeElement, hairBase, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor(colours.hair);
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
	}

	renderTail() {

		const prefabRoot = this.imageMap.root + this.imageMap.base[this.body.base];
		const tailBase = this.body.tail ? prefabRoot + this.imageMap.tail[this.body.tail].colourBase : "";
		const tailMarkings = this.body.tail ? prefabRoot + this.imageMap.tail[this.body.tail].markingsBase : "";
		const tailLines = this.body.tail ? prefabRoot + this.imageMap.tail[this.body.tail].lines : "";
		const colours = this.body.colour;

		this.tailColour.nativeElement.removeAttribute("data-caman-id");
		Caman(this.tailColour.nativeElement, tailBase, function () {
			this.newLayer(function() {
				this.setBlendingMode("normal");
				this.fillColor(colours.body);
				this.newLayer(function() {
					this.overlayImage(tailMarkings);
					this.newLayer(function() {
						this.fillColor(colours.markings);
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

	renderAll() {
		this.renderCoat();
		this.renderLeftEar();
		this.renderRightEar();
		this.renderHair();
		this.renderTail();
	}

	combine() {

		// Create an invisible canvas to hold the combined layers
		let canvas = document.createElement("canvas");
		canvas.height = this.bodyColour.nativeElement.height;
		canvas.width = this.bodyColour.nativeElement.width;

		// Get the canvas context
		let canvasContext = canvas.getContext("2d");

		// Draw on the canvas layers
		canvasContext.drawImage(this.tailColour.nativeElement, 0, 0);
		canvasContext.drawImage(this.tailLines.nativeElement, 0, 0);
		canvasContext.drawImage(this.bodyColour.nativeElement, 0, 0);
		canvasContext.drawImage(this.bodyLines.nativeElement, 0, 0);
		canvasContext.drawImage(this.leftEarColour.nativeElement, 0, 0);
		canvasContext.drawImage(this.leftEarLines.nativeElement, 0, 0);
		canvasContext.drawImage(this.hairColour.nativeElement, 0, 0);
		canvasContext.drawImage(this.hairLines.nativeElement, 0, 0);
		canvasContext.drawImage(this.rightEarColor.nativeElement, 0, 0);
		canvasContext.drawImage(this.rightEarLines.nativeElement, 0, 0);

		// Create an image string and display it
		this.combinedSource = canvas.toDataURL("img/png");

		// Alternatively, create and image object for later use
		let imgObj = new Image();
		imgObj.src = this.combinedSource;
	}
}
