import { createValidators } from '../shared/validation/validation-utils';

export const cvCreatorValidators = {
  required: createValidators({ required: true }),
  email: createValidators({ required: true, email: true }),
};
