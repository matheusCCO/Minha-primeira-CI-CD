const { sayHello } = require('../src/index');
const assert = require('assert');

describe('sayHello', () => {
    it('should return a greeting message', () => {
        assert.strictEqual(sayHello(), "Hello, Jenkins Pipeline!");
    });
});
