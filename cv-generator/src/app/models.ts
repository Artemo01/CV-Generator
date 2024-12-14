import { FormArray, FormControl, FormGroup } from '@angular/forms';

/**
 * Helper type that maps a model to a type that can be used for FormGroup, FormControl and FormArray.
 * Taken from this post:
 * https://medium.com/netanelbasal/typed-reactive-forms-in-angular-no-longer-a-type-dream-bf6982b0af28
 */

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Date
    ? FormControl<T[K]>
    : T[K] extends Record<any, any>
    ? T[K] extends (infer U)[]
      ? U extends Record<any, any>
        ? FormArray<FormGroup<ControlsOf<U>>>
        : FormArray<FormControl<U>>
      : FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K]>;
};
