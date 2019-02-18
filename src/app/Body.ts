import { BodyColour } from "./BodyColour";

export class Body {
	base;
	coat;
	leftEar;
	rightEar;
	hair;
	tail;
	colour;

	constructor (base: String, coat: String, leftEar: String, rightEar: String, hair: String, tail: String, colour: BodyColour) {

		this.base = base;
		this.coat = coat;
		this.leftEar = leftEar;
		this.rightEar = rightEar;
		this.hair = hair;
		this.tail = tail;
		this.colour = colour;
	}
}
