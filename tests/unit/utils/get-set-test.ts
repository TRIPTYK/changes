import ChangeValidator from 'change-validator/utils/change-validator';
import { setupBaseChangeset } from 'dummy/tests/setup-base-changeset';
import { module, test } from 'qunit';

module('Unit | Utility | change-validator | get-set', function (hooks) {
  let changeset: ChangeValidator;

  hooks.beforeEach(function () {
    changeset = setupBaseChangeset();
  });

  test('Set alters DTO and not DATA', function (assert) {
    const value = 'kill chickens';
    changeset.set('todos.0.title', value);
    assert.strictEqual((changeset.dto as any).todos[0].title, value);
    assert.strictEqual((changeset.data as any).todos[0].title, 'clean kitchen');
  });

  test('Get fetch data from DTO and not DATA', function (assert) {
    const path = 'todos.0.title';
    const value = 'bloup';
    changeset.set(path, value);

    assert.strictEqual(changeset.get(path), value);
  });
});
