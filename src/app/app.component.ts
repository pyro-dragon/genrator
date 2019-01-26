import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	body = {
		base: "", 
		coat: "", 
		sex: "", 
		leftEar: "", 
		rightEar: "", 
		hair: ""
	};
}
