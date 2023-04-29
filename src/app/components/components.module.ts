import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './converter/converter.component';
import { ConversionsListComponent } from './conversions-list/conversions-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const COMPONENTS = [
  ConverterComponent,
  ConversionsListComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [[...COMPONENTS]]


})
export class ComponentsModule { }
