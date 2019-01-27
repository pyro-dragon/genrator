import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BodyFormComponent } from './body-form/body-form.component';
import { CharacterDisplayComponent } from './character-display/character-display.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyFormComponent,
    CharacterDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
