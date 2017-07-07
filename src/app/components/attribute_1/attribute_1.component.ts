import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { AttributesService } from './../../services/attributes.service';
import { Attribute } from '../../interfaces/attribute.interface';

@Component({
  selector: 'app-attribute1',
  templateUrl: './attribute_1.component.html'
})
export class Attribute1Component implements OnInit {

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
    this.attribute = this.att.newAtt('attribute_1');
    this.isCreating = true;
  }

  /**Gets all categories attributes */
  getAttributes() {
    this.att.getAllAttributes().then(attributes => {
      this.attributes = attributes;
    });
  }

  /**Emit category validation for total validation */
  sendValidation(validation) {
    this.valid.emit(validation);
  }
}
