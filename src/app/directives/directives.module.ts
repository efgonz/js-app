import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';

import { RangesComponent } from './input/ranges/ranges.component';
import { InputComponent } from './input/input.component';

const exportedModules = [
  InputComponent,
  RangesComponent
];

@NgModule({
  declarations: [
    ...exportedModules
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    ...exportedModules
  ]
})
export class AppCommonModule { }
