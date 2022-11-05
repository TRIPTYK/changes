import ChangeValidator from 'change-validator/utils/change-validator';
import { setupBaseChangeset } from 'dummy/tests/setup-base-changeset';
import { module, test } from 'qunit';

module('Unit | Utility | change-validator | errors', function (hooks) {
  let changeset: ChangeValidator;

  hooks.beforeEach(function () {
    changeset = setupBaseChangeset();
  });

  test('Errors added are gettable', function (assert) {
    changeset.set('todos.0.title', 'kill chickens');
    changeset.setError('todos.0.title', 'Err');
    assert.true(changeset.hasError('todos.0.title'));
  });

  test('Errors added mark the changeset as invalid', function (assert) {
    changeset.setError('todos.0.title', 'Err');
    assert.true(changeset.isInvalid);
  });

  test('removeErrors marks the changeset as valid', function (assert) {
    changeset.setError('todos.0.title', 'Err');
    assert.true(changeset.isInvalid);
    changeset.removeErrors();
    assert.true(changeset.isValid);
  });

  test('the changeset is still invalid if there is still another error', function (assert) {
    changeset.setError('todos.0.title', 'Err');
    changeset.setError('todos.1.title', 'Err');
    changeset.removeError('todos.0.title');
    assert.true(changeset.isInvalid);
  });
});
