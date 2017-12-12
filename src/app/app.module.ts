import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MdIconModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AmountInputDirective} from './amount-input.directive';
import {CurrencyPipe} from '@angular/common';
import { AmountComponent } from './amount/amount.component';

@NgModule({
  declarations: [
    AppComponent,
    AmountInputDirective,
    AmountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MdIconModule
  ],
  providers: [
    AmountInputDirective,
    CurrencyPipe,
    {
    provide: LOCALE_ID,
    useValue: 'fr-FR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
