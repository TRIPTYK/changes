import ChangeValidator from 'change-validator/utils/change-validator';
import { setupBaseChangeset } from 'dummy/tests/setup-base-changeset';
import { module, test } from 'qunit';

module('Unit | Utility | change-validator | rollback', function (hooks) {
  let changeset: ChangeValidator;

  hooks.beforeEach(function () {
    changeset = setupBaseChangeset();
  });

  test('rollbacks current changes', function (assert) {
    changeset.set('title', 'troll');
    changeset.rollback();
    assert.deepEqual(changeset.dto, {
      title: 'hello',
      todos: [
        {
          title: 'clean kitchen',
        },
      ],
    });
  });

  test('Rollback multiple array changes', function (assert) {
    changeset.set('todos.0', { title: 'blarg' });
    changeset.set('todos.1', { title: 'blarg 1' });
    changeset.set('todos.2', { title: 'blarg 2' });
    changeset.rollback();
    assert.deepEqual(changeset.dto, {
      title: 'hello',
      todos: [
        {
          title: 'clean kitchen',
        },
      ],
    });
  });

  test('Rollback at last executed changes', function (assert) {
    changeset.set('title', 'troll');
    changeset.execute();
    changeset.set('todos', 'mdr');
    changeset.rollback();
    assert.deepEqual(changeset.data, {
      title: 'troll',
      todos: [
        {
          title: 'clean kitchen',
        },
      ],
    });
  });
});
