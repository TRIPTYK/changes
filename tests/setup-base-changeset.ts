import ChangeValidator from 'change-validator/utils/change-validator';

export const baseDataObject = {
  title: 'hello',
  todos: [
    {
      title: 'clean kitchen',
    },
  ],
};

export function setupBaseChangeset(data?: Record<string, unknown>) {
  return new ChangeValidator(data ?? baseDataObject);
}
