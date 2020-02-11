import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-file',
  template: `
    <input type="file" [formlyAttributes]="field">
  `
})
export class FormlyFieldFile extends FieldType {}
