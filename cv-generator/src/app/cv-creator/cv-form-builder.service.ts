import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  AboutMe,
  ColumnPosition,
  Contact,
  ControlsOf,
  CvDocumentModel,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class CvFormBuilderService {
  constructor(private formBuilder: FormBuilder) {}

  public initialize() {
    return this.formBuilder.group({
      aboutMe: new FormGroup({
        firstName: new FormControl<string>(''),
        lastName: new FormControl<string>(''),
        job: new FormControl<string>(''),
        aboutMeText: new FormControl<string>(''),
        columnPosition: new FormControl<ColumnPosition>(ColumnPosition.left),
      }),
      contact: new FormGroup({
        email: new FormControl<string>(''),
        phone: new FormControl<string>(''),
        born: new FormControl<Date | null>(null),
        address: new FormControl<string>(''),
      }),
    });
  }
}
