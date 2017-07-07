import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { AttributesService } from './../../../services/attributes.service';
import { Ranges } from '../../../interfaces/ranges.interface';

@Component({
  selector: 'app-ranges',
  templateUrl: './ranges.component.html',
  styleUrls: ['./ranges.component.scss']
})
export class RangesComponent implements OnInit {

  @Output() rangesStatus = new EventEmitter();
  @Output() rangesData = new EventEmitter();

  defaultRanges: Ranges = {
    rangeMin: null,
    rangeMax: null,
    unit: '',
    precision: null,
    accuracy: null
  };

  data: Ranges;
  formRanges: FormGroup;
  rangeMax: number;
  rangeMin: number;
  valid = false;
  selectedObject = false;
  status = false;

  constructor() {}

  ngOnInit() {
    this.rangesStatus.emit(this.status);
    this.formData();
    this.rangesValidatorsStateChanges();
    this.checkIfRangeFormValid();
    this.updateValues();
    this.rangesData.emit(this.defaultRanges);
  }

  /**Reactive form initialization */
  formData() {
    this.formRanges = new FormGroup ({
      'rangeMin': new FormControl(null, Validators.required),
      'rangeMax': new FormControl(null, Validators.required),
      'unit': new FormControl(),
      'precision': new FormControl(null, Validators.required),
      'accuracy': new FormControl(null, Validators.required),
    });
  }

  /**Emit new values */
  updateValues() {
    this.formRanges.valueChanges.subscribe(res => {
      this.rangesData.emit(this.formRanges.value);
    });
  }

  /**Checks the ranges form validation */
  checkIfRangeFormValid() {
    this.formRanges.statusChanges.subscribe(status => {
      this.status = this.formRanges.valid;
      this.rangesStatus.emit(this.status);
      if (this.status) {
        this.data = this.formRanges.value;
        this.rangesData.emit(this.data);
      }
    });
  }

  /**Verifies if min and max ranges are right and synchronizes with accuracy and precision values */
  rangesValidatorsStateChanges() {
    let rangeMax;
    let rangeMin;
    this.formRanges.controls['rangeMax'].valueChanges.subscribe(max => {
      rangeMax = max ? Number(max) : null;
      this.valid = typeof(rangeMax) === 'number' && typeof(rangeMin) === 'number' && (rangeMax > rangeMin) ? true : false;
      if (!this.valid) {
        this.formRanges.controls['rangeMin'].setErrors({ 'error': 'Incorrect Max and Min ranges' });
        this.formRanges.controls['rangeMax'].setErrors({ 'error': 'Incorrect Max and Min ranges' });
      } else {
        this.formRanges.controls['rangeMin'].setErrors(null);
        this.formRanges.controls['rangeMax'].setErrors(null);
      }
      this.verifyPrecisionRange('precision', this.formRanges.controls['precision'].value, rangeMax, rangeMin);
      this.verifyPrecisionRange('accuracy', this.formRanges.controls['accuracy'].value, rangeMax, rangeMin);
    });
    this.formRanges.controls['rangeMin'].valueChanges.subscribe(min => {
      rangeMin = min ? Number(min) : null;
      this.valid = typeof(rangeMax) === 'number' && typeof(rangeMin) === 'number' && (rangeMax > rangeMin) ? true : false;
      if (!this.valid) {
        this.formRanges.controls['rangeMax'].setErrors({ 'error': 'Incorrect Max and Min ranges' });
        this.formRanges.controls['rangeMin'].setErrors({ 'error': 'Incorrect Max and Min ranges' });
      } else {
        this.formRanges.controls['rangeMax'].setErrors(null);
        this.formRanges.controls['rangeMin'].setErrors(null);
      }
      this.verifyPrecisionRange('precision', this.formRanges.controls['precision'].value, rangeMax, rangeMin);
      this.verifyPrecisionRange('accuracy', this.formRanges.controls['accuracy'].value, rangeMax, rangeMin);
    });

    this.formRanges.controls['precision'].valueChanges.subscribe(interval => {
      this.verifyPrecisionRange('precision', interval, rangeMax, rangeMin);
    });

    this.formRanges.controls['accuracy'].valueChanges.subscribe(interval => {
      this.verifyPrecisionRange('accuracy', interval, rangeMax, rangeMin);
    });
  }

  /**Verifies the accuracy or precision for a given range */
  verifyPrecisionRange(param: string, interval: string, max: number, min: number) {
    const step = (max - min) / Number(interval);
    if (this.valid && (step % 1 === 0)) {
      this.formRanges.controls[param].setErrors(null);
    } else {
      this.formRanges.controls[param].setErrors({
        'error': `${(param === 'precision' ? 'Imprecise' : 'Inaccurate')} value`
      });
    }
  }
}
