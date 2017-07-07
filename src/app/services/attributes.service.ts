import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Attribute } from './../interfaces/attribute.interface';

@Injectable()
export class AttributesService {

  attributes: Attribute[] = [];
  defaultAtt = {
    name: '',
    description: '',
    defaultValue: '',
    dataType: '',
    enumerations: [],
    format: '',
    deviceResourceType: 'DEFAULT VALUE',
    category: '',
    id: '',
  };

  public attributeCreated: BehaviorSubject<any> = new BehaviorSubject('');
  public attributeDeleted: BehaviorSubject<any> = new BehaviorSubject('');
  public attributeModified: BehaviorSubject<any> = new BehaviorSubject('');
  public noAttributes: BehaviorSubject<any> = new BehaviorSubject('');

  constructor() {}

  /**Gets all attributes */
  getAllAttributes(): Promise<Attribute[]> {
    return Promise.resolve(this.attributes);
  }

  /**Creates a new attribute */
  newAtt(category: string) {
    const attribute = this.defaultAtt;
    attribute.id = this.generateId();
    attribute.category = category;
    this.attributes.push(attribute);
    return attribute;
  }

  /**Modifies an existing attribute */
  modifyAtt(attribute: Attribute) {
    const modifiedIndex = this.attributes.findIndex(res => res.id === attribute.id);
    this.attributes[modifiedIndex] = attribute;
    this.attributeModified.next(this.attributes);
  }

  /**Deletes an attribute */
  deleteAttribute(id: string) {
    const index = this.attributes.findIndex(v => v.id === id);
    this.attributes.splice(index, 1);
    this.attributeDeleted.next('');
  }

  /**Verifies if there is any attribute */
  verifyIfAttributes() {
    if (this.attributes.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**Generates a random Id */
  generateId() {
    const date = new Date();
    const time = date.getMilliseconds();
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    text += time;
    return text;
  }
}
