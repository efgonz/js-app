import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {

  @Output() validation = new EventEmitter();

  valid_1 = true;
  valid_2 = true;
  valid_3 = true;
  valid_4 = true;
  valid_5 = true;

  constructor() {}

  /**Submit total validation from all forms */
  submitValidation() {
    let validation = false;
    if (this.valid_1 && this.valid_2 && this.valid_3 && this.valid_4 && this.valid_5) {
      validation = true;
    }
    this.validation.emit(validation);
  }
}
