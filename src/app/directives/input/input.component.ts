import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { AttributesService } from './../../services/attributes.service';

import { Attribute } from '../../interfaces/attribute.interface';
import { Ranges } from './../../interfaces/ranges.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() attributes;
  @Input() attrib;
  @Output() valid = new EventEmitter();
  @Output() deleted = new EventEmitter();

  data: Attribute;
  form: FormGroup;
  rangesData: Ranges;
  value: string;
  statusRanges: boolean;
  validForm = false;
  nameError: string;
  id: string;
  format = 'none';
  dataType = '';
  selectedObject = false;

  formats = [
    {value: 'none'},
    {value: 'number'},
    {value: 'boolean'},
    {value: 'date-time'},
    {value: 'cdata'},
    {value: 'uri'}
  ];

  types = [
    {value: 'string'},
    {value: 'object'}
  ];

  values = [];

  constructor(private att: AttributesService) {}

  ngOnInit() {
    this.valid.emit(false);
    this.formData();
    this.initformatValidation();
    this.typeToObject();
    this.formValid();
    this.checkIfExistingName();
    this.checkValues();
  }

  /**Reactive form initialization */
  formData() {
    this.form = new FormGroup ({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'deviceResourceType': new FormControl(),
      'defaultValue': new FormControl('', Validators.required),
      'dataType': new FormControl('string'),
      'enumerations': new FormControl(''),
      'format': new FormControl('none'),
    });
  }

  /**Checks format when updated */
  initformatValidation() {
    this.form.controls['format'].valueChanges.subscribe(format => {
      this.format = format;
    });
    this.form.controls['deviceResourceType'].disable();
  }

  /**Checks for any change in the form */
  checkValues() {
    this.id = this.attrib.id;
    this.updateValues();
    this.form.valueChanges.subscribe(res => {
      this.updateValues();
    });
  }

  /**Update values to the attributes array */
  updateValues(data?: Ranges) {
    const currentAtt = this.form.value;
    currentAtt.deviceResourceType = 'DEFAULT VALUE';
    currentAtt.category = this.attrib.category;
    currentAtt.id = this.id;
    if (this.format === 'number' && this.rangesData) {
      currentAtt.ranges = this.rangesData;
    }
    if (this.format === 'none' && this.values) {
      currentAtt.enumerations = this.values;
    }
    setTimeout(() => {
      this.att.modifyAtt(currentAtt);
    });
    this.att.getAllAttributes();
  }

  /**Disables deviceResourceType, defaultValue and format when dataType is an object */
  typeToObject() {
    this.form.controls['dataType'].valueChanges.subscribe(type => {
      this.selectedObject = false;
      this.dataType = type;
      if (type === 'object') {
        this.selectedObject = true;
        this.form.controls['defaultValue'].disable();
        this.form.controls['format'].disable();
        this.form.controls['defaultValue'].setValue(null);
        this.form.controls['format'].setValue(null);
      } else {
        this.form.controls['deviceResourceType'].enable();
        this.form.controls['defaultValue'].enable();
        this.form.controls['format'].enable();
      }
    });
  }

  /**Checks if an attribute name already exist */
  checkIfExistingName() {
    this.form.controls['name'].valueChanges.subscribe(name => {
      const name_1 = name.toLowerCase();
      if (this.attributes) {
        this.attributes.forEach(item => {
          const name_2 = item.name.toLowerCase();
          if (name_1 === name_2) {
            this.form.controls['name'].setErrors({ 'error': 'Name already taken' });
          }
        });
      }
    });
  }

  /**Update enumerations values */
  submitValue(value) {
    if (this.format === 'none') {
      this.values.push(value);
      this.form.controls['enumerations'].setValue('');
    }
  }

  /**Remove an specific value */
  removeValue(value) {
    const index = this.values.findIndex(v => v === value);
    this.values.splice(index, 1);
    this.form.controls['enumerations'].setValue(this.values);
    this.form.controls['enumerations'].setValue('');
  }

  /**Verifies if the complete data in the form is valid */
  formValid() {
    this.form.statusChanges.subscribe(res => {
      if (this.format !== 'number') {
        this.validForm =  this.form.valid;
        this.valid.emit(this.validForm);
      } else {
        this.verifyStatus(this.statusRanges);
      }
    });
  }

  /**Verifies Range Form validation when format is number */
  verifyStatus(status) {
    this.statusRanges = status;
    if (this.form.valid && status) {
      setTimeout(() => {
        this.validForm = true;
        this.valid.emit(this.validForm);
      });
    } else {
      setTimeout(() => {
        this.validForm = false;
        this.valid.emit(this.validForm);
      });
    }
  }

  /**Deletes the attribute */
  deleteAttribute() {
    this.att.deleteAttribute(this.id);
    this.deleted.emit('');
    this.valid.emit(true);
  }
}
