import ChangeValidator from 'change-validator/utils/change-validator';
import { setupBaseChangeset } from 'dummy/tests/setup-base-changeset';
import { module, test } from 'qunit';

module('Unit | Utility | change-validator | execute', function (hooks) {
  let changeset: ChangeValidator;

  hooks.beforeEach(function () {
    changeset = setupBaseChangeset();
  });

  test('Merges changes into data', function (assert) {
    changeset.set('todos.0.title', 'kill chickens');
    changeset.execute();
    assert.deepEqual(changeset.data, {
      title: 'hello',
      todos: [
        {
          title: 'kill chickens',
        },
      ],
    });
  });
  test('Merges changes from whole array into data', function (assert) {
    changeset.set('todos', [
      {
        title: 'pojito',
      },
    ]);
    changeset.execute();
    assert.deepEqual(changeset.data, {
      title: 'hello',
      todos: [
        {
          title: 'pojito',
        },
      ],
    });
  });
  test('Merges changes from an array element into data', function (assert) {
    changeset.set('todos.1', {
      title: 'amaury',
    });
    changeset.execute();
    assert.deepEqual(changeset.data, {
      title: 'hello',
      todos: [
        {
          title: 'clean kitchen',
        },
        {
          title: 'amaury',
        },
      ],
    });
  });
  test('It does not remove old arrays', function (assert) {
    changeset.set('todos', [
      ...(changeset.get('todos') as unknown[]),
      {
        title: 'clean plicks',
      },
    ]);

    changeset.execute();

    changeset.set('todos', [
      ...(changeset.get('todos') as unknown[]),
      {
        title: 'clean chicks',
      },
    ]);

    changeset.execute();

    assert.deepEqual(changeset.data, {
      title: 'hello',
      todos: [
        {
          title: 'clean kitchen',
        },
        {
          title: 'clean plicks',
        },
        {
          title: 'clean chicks',
        },
      ],
    });
  });
});
