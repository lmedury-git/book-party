import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | bookparty', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:bookparty');
    assert.ok(route);
  });
});
