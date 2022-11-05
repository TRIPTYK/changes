import ChangeValidator from 'change-validator/utils/change-validator';
import { setupBaseChangeset } from 'dummy/tests/setup-base-changeset';
import { module, test } from 'qunit';

module('Unit | Utility | change-validator | changes', function (hooks) {
  let changeset: ChangeValidator;

  hooks.beforeEach(function () {
    changeset = setupBaseChangeset();
  });

  test('Returns dot-path changes', function (assert) {
    changeset.set('todos.0.title', 'kill chickens');
    assert.deepEqual(changeset.changes, [
      {
        op: 'replace',
        path: 'todos.0.title',
        value: 'kill chickens',
      },
    ]);
  });
  test('Changes are added', function (assert) {
    changeset.set('todos.0.title', 'kill chickens');

    changeset.set('title', 'kill kitchens');
    assert.deepEqual(changeset.changes, [
      {
        op: 'replace',
        path: 'todos.0.title',
        value: 'kill chickens',
      },
      {
        op: 'replace',
        path: 'title',
        value: 'kill kitchens',
      },
    ]);
  });
});
