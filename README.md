# @husien/code_injector

`@husien/code_injector` is a simple npm package that allows you to inject code into JavaScript files based on specified tags within the file. With this package, you can easily insert code snippets or make modifications to existing JavaScript files without manually editing them.<br>
The reason for me making this package was that I couldn't find any easy injection methods. I hope this can serve as one stop shop for injection. Also thinking about adding Mocha templates, Jest Templates so that we can write test's on runtime and also execute them.

## Installation

You can install `@husien/code_injector` using npm:

```shell
npm install @husien/code_injector
```

```javascript
const { inject } = require("@husien/code_injector");

inject(path, codeToInject, tagToInjectAt);
```

Tag to inject can be a comment inside a file above which the code will be injected<br>
For example if tagToInjectAt is //tag<br>
and this is executed

```javascript
inject(
  fielpath,
  ` describe("multiply", () => {
    it("should correctly multiply two numbers", () => {
      const result = MathUtils.multiply(2, 3);
      assert.equal(result, 6);
    });
    it("should return 0 if any operand is 0", () => {
      const result = MathUtils.multiply(2, 0);
      assert.equal(result, 0);
    });
  });`,
  "//tag"
);
```

then the result will be

```javascript
//Before
// Existing code

//tag

// Remaining code
```

```javascript
//After
// Existing code
describe("multiply", () => {
  it("should correctly multiply two numbers", () => {
    const result = MathUtils.multiply(2, 3);
    assert.equal(result, 6);
  });
  it("should return 0 if any operand is 0", () => {
    const result = MathUtils.multiply(2, 0);
    assert.equal(result, 0);
  });
});
//tag

// Remaining code
```

The file then can be executed on runtime beacause the cache of the file is also cleared simultaneously on injection
