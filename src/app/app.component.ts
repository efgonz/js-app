import { Component, OnInit } from '@angular/core';

import { AttributesService } from './services/attributes.service';
import { Attribute } from './interfaces/attribute.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  attributes: Attribute[] = [];
  validation: boolean;
  noAttributes = false;

  constructor(private att: AttributesService) {}

  ngOnInit() {
    this.getAttributes();
    this.att.attributeCreated.subscribe(res => {
      this.getAttributes();
    });
    this.att.attributeDeleted.subscribe(res => {
      this.getAttributes();
    });
    this.att.attributeModified.subscribe(res => {
      this.getAttributes();
    });
  }

  /**Get all categories attributes */
  getAttributes() {
    this.att.getAllAttributes().then(attributes => {
      this.attributes = attributes;
    });
  }

  /**Handle "save" button state */
  setSaveBtnState(validation) {
    this.noAttributes = this.att.verifyIfAttributes();
    if (!this.noAttributes) {
      setTimeout(() => {
        this.validation = validation;
      }, 10);
    } else {
      setTimeout(() => {
        this.validation = false;
      }, 10);
    }
  }
}

