import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { AttributesService } from './../../services/attributes.service';
import { Attribute } from '../../interfaces/attribute.interface';

@Component({
  selector: 'app-attribute5',
  templateUrl: './attribute_5.component.html'
})
export class Attribute5Component implements OnInit {

  @Output() valid = new EventEmitter();

  attributes: Attribute[] = [];
  attribute = {};
  isCreating = false;

  constructor(private att: AttributesService) { }

  ngOnInit() {
    this.getAttributes();
    this.att.attributeCreated.subscribe(res => {
      this.getAttributes();
    });
  }

  /**Creates a new attribute for this category */
  createAttribute() {
    this.attribute = this.att.newAtt('attribute_5');
    this.isCreating = true;
  }

  /**Gets all categories attributes */
  getAttributes() {
    this.att.getAllAttributes().then(attributes => {
      this.attributes = attributes;
    });
  }

  /**Sync category validation for total validation */
  sendValidation(validation) {
    this.valid.emit(validation);
  }
}
