import { Component, Input, ViewChild, ElementRef, KeyValueDiffers, DoCheck, AfterContentInit } from "@angular/core";
import layout from "../../assets/layout.json";
import { Body } from "../Body";
import { combineLatest } from 'rxjs';
import { BodyColour } from '../BodyColour.js';
declare var Caman: any;

@Component({
	selector: "app-character-display",
	templateUrl: "./character-display.component.html",
	styleUrls: ["./character-display.component.css"]
})
export class CharacterDisplayComponent implements DoCheck, AfterContentInit {

	@Input("body") outsideBody: Body;
	body;

	// Create an invisible canvas to hold the combined layers
	canvasCollection = {
		bodyColour: document.createElement("canvas"),
		bodyLines: document.createElement("canvas"),
		hairColour: document.createElement("canvas"),
		hairLines: document.createElement("canvas"),
		leftEarColour: document.createElement("canvas"),
		leftEarLines: document.createElement("canvas"),
		rightEarColor: document.createElement("canvas"),
		rightEarLines: document.createElement("canvas"),
		tailColour: document.createElement("canvas"),
		tailLines: document.createElement("canvas")
	};

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
	renderedSrc = "";
	outstandingRenderCount = 0;

	height = 800;
	width = 365;
	contentAvailable = false;

	constructor(differs: KeyValueDiffers) {
		this.JSON = JSON;
		this.body = new Body("", "", "", "", "", "", new BodyColour("", "", "", "", "", ""));
		this.differ = differs.find({}).create();
		this.colourDiffer = differs.find({}).create();

		for (const canvasName in this.canvasCollection) {
			if (this.canvasCollection[canvasName]) {
				this.canvasCollection[canvasName].height = this.height;
				this.canvasCollection[canvasName].width = this.width;
			}
		}
	}

	ngAfterContentInit() {
		// this.contentAvailable = true;
		this.render();

		this.body = this.outsideBody;
	}

	change() {
		this.body.base = "female";
	}

	ngDoCheck() {
		const changes = this.differ.diff(this.body); // check for changes
		if (changes) {
			// do something if changes were found
			changes.forEachChangedItem((change) => {
				switch (change.key) {
					case "base" : this.renderAll().then(() => {this.render(); }); break;
					case "coat" : this.renderCoat().then(() => {this.render(); }); break;
					case "eyes" : this.renderCoat().then(() => {this.render(); }); break;
					case "leftEar" : this.renderLeftEar().then(() => {this.render(); }); break;
					case "rightEar" : this.renderRightEar().then(() => {this.render(); }); break;
					case "hair" : this.renderHair().then(() => {
						this.render(); 
					}); break;
					case "tail" : this.renderTail().then(() => {this.render(); }); break;
					default : this.renderAll().then(() => {this.render(); });
				}
			});
		}

		const colourChanges = this.colourDiffer.diff(this.body.colour); // check for changes
		if (colourChanges) {
			// do something if changes were found
			colourChanges.forEachChangedItem((change) => {
				switch (change.key) {
					case "body" : this.renderAll().then(() => {this.render(); }); break;
					case "eyes" : this.renderCoat().then(() => {this.render(); }); break;
					case "claws" : this.renderCoat().then(() => {this.render(); }); break;
					// case "markings" : this.renderCoat().then(() => {this.renderTail().then(this.render); }); break;
					case "nose" : this.renderCoat().then(() => {this.render(); }); break;
					case "hair" : this.renderHair().then(() => {
						this.render(); 
					}); break;
					// default : this.renderAll();
				}
			});
		}

		if (changes || colourChanges) {

			console.log("Change detected: " + this.extractChangesMap(changes) + "\nColour detected: " + this.extractChangesMap(colourChanges));
			// console.log("rendering... ");
			this.render();
		}
	}

	extractChangesMap(changes) {
		let outputString = "";

		if (changes) {
			changes._records.forEach(i => {
				outputString += i.key + ": '" + i.previousValue + "' => '" + i.currentValue + "'\n";
			});
		}

		return outputString;
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
		};

		this.canvasCollection.bodyColour.removeAttribute("data-caman-id");
		const bodyColourPromise = new Promise((resolve) => {
			Caman(this.canvasCollection.bodyColour, coatBase, function () {
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

				this.render(() => {
					resolve("Render Success!");
				});
			});
		});

		this.canvasCollection.bodyLines.removeAttribute("data-caman-id");
		const bodyLinesPromise = new Promise((resolve) => {
			Caman(this.canvasCollection.bodyLines, baseLines, function () {
				this.newLayer(function() {
					this.setBlendingMode("normal");
					this.fillColor("#000000");
				});

				this.render(resolve("Render Success!"));
			});
		});

		return Promise.all([bodyColourPromise, bodyLinesPromise]);
	}

	renderLeftEar() {

		const prefabRoot = this.imageMap.root + this.imageMap.base[this.body.base];
		const leftEarBase = this.body.leftEar ? prefabRoot + this.imageMap.leftEar[this.body.leftEar].colourBase : "";
		const leftEarLines = this.body.leftEar ? prefabRoot + this.imageMap.leftEar[this.body.leftEar].lines : "";
		const colours = this.body.colour;

		this.canvasCollection.leftEarColour.removeAttribute("data-caman-id");
		const leftEarColourPromise = new Promise((resolve) => {
			Caman(this.canvasCollection.leftEarColour, leftEarBase, function () {
				this.newLayer(function() {
					this.setBlendingMode("normal");
					this.fillColor(colours.body);
				});

				this.render(resolve());
			});
		});

		this.canvasCollection.leftEarLines.removeAttribute("data-caman-id");
		const leftEarLinesPromise = new Promise((resolve) => {
			Caman(this.canvasCollection.leftEarLines, leftEarLines, function () {
				this.newLayer(function() {
					this.setBlendingMode("normal");
					this.fillColor("#000000");
				});

				this.render(resolve());
			});
		});

		return Promise.all([leftEarColourPromise, leftEarLinesPromise]);
	}

	renderRightEar() {

		const prefabRoot = this.imageMap.root + this.imageMap.base[this.body.base];
		const rightEarBase = this.body.rightEar ? prefabRoot + this.imageMap.rightEar[this.body.rightEar].colourBase : "";
		const rightEarLines = this.body.rightEar ?  prefabRoot + this.imageMap.rightEar[this.body.rightEar].lines : "";
		const colours = this.body.colour;

		this.canvasCollection.rightEarColor.removeAttribute("data-caman-id");
		const rightEarColorPromise = new Promise((resolve) => {
			Caman(this.canvasCollection.rightEarColor, rightEarBase, function () {
				this.newLayer(function() {
					this.setBlendingMode("normal");
					this.fillColor(colours.body);
				});

				this.render(resolve());
			});
		});

		this.canvasCollection.rightEarLines.removeAttribute("data-caman-id");
		const rightEarLinesPromise = new Promise((resolve) => {
			Caman(this.canvasCollection.rightEarLines, rightEarLines, function () {
				this.newLayer(function() {
					this.setBlendingMode("normal");
					this.fillColor("#000000");
				});

				this.render(resolve());
			});
		});

		return Promise.all([rightEarColorPromise, rightEarLinesPromise]);
	}

	renderHair() {

		const prefabRoot = this.imageMap.root + this.imageMap.base[this.body.base];
		const hairBase = this.body.hair ? prefabRoot + this.imageMap.hair[this.body.hair].colourBase : "";
		const hairLines = this.body.hair ? prefabRoot + this.imageMap.hair[this.body.hair].lines : "";
		const colours = this.body.colour;

		this.canvasCollection.hairColour.removeAttribute("data-caman-id");
		const hairColourPromise = new Promise((resolve) => {
			Caman(this.canvasCollection.hairColour, hairBase, function () {
				this.newLayer(function() {
					this.setBlendingMode("normal");
					this.fillColor(colours.hair);
				});

				this.render(resolve());
			});
		});

		this.canvasCollection.hairLines.removeAttribute("data-caman-id");
		const hairLinesPromise = new Promise((resolve) => {
			Caman(this.canvasCollection.hairLines, hairLines, function () {
				this.newLayer(function() {
					this.setBlendingMode("normal");
					this.fillColor("#000000");
				});

				this.render(resolve());
			});
		});

		return Promise.all([hairColourPromise, hairLinesPromise]);
	}

	renderTail() {

		const prefabRoot = this.imageMap.root + this.imageMap.base[this.body.base];
		const tailBase = this.body.tail ? prefabRoot + this.imageMap.tail[this.body.tail].colourBase : "";
		const tailMarkings = this.body.tail ? prefabRoot + this.imageMap.tail[this.body.tail].markingsBase : "";
		const tailLines = this.body.tail ? prefabRoot + this.imageMap.tail[this.body.tail].lines : "";
		const colours = this.body.colour;

		this.canvasCollection.tailColour.removeAttribute("data-caman-id");
		const tailColourPromise = new Promise((resolve) => {
			Caman(this.canvasCollection.tailColour, tailBase, function () {
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

				this.render(resolve());
			});
		});

		this.canvasCollection.tailLines.removeAttribute("data-caman-id");
		const tailLinesPromise = new Promise((resolve) => {
			Caman(this.canvasCollection.tailLines, tailLines, function () {
				this.newLayer(function() {
					this.setBlendingMode("normal");
					this.fillColor("#000000");
				});

				this.render(resolve());
			});
		});

		return Promise.all([tailColourPromise, tailLinesPromise]);
	}

	renderAll() {
		return Promise.all([this.renderCoat(), this.renderLeftEar(), this.renderRightEar(), this.renderHair(), this.renderTail()]);
	}

	/** 
	 * A render function for outputting an image composed from all layers.
	*/
	render() {
		// Create an invisible canvas to hold the combined layers
		const canvas = document.createElement("canvas");
		canvas.height = this.height;
		canvas.width = this.width;

		// Get the canvas context
		const canvasContext = canvas.getContext("2d");

		// Draw on the canvas layers
		canvasContext.drawImage(this.canvasCollection.tailColour, 0, 0);
		canvasContext.drawImage(this.canvasCollection.tailLines, 0, 0);
		canvasContext.drawImage(this.canvasCollection.bodyColour, 0, 0);
		canvasContext.drawImage(this.canvasCollection.bodyLines, 0, 0);
		canvasContext.drawImage(this.canvasCollection.leftEarColour, 0, 0);
		canvasContext.drawImage(this.canvasCollection.leftEarLines, 0, 0);
		canvasContext.drawImage(this.canvasCollection.hairColour, 0, 0);
		canvasContext.drawImage(this.canvasCollection.hairLines, 0, 0);
		canvasContext.drawImage(this.canvasCollection.rightEarColor, 0, 0);
		canvasContext.drawImage(this.canvasCollection.rightEarLines, 0, 0);

		// Create an image string and display it
			console.log("Rendering to png");
		this.renderedSrc = canvas.toDataURL("img/png");
	}
}
