# audition
![npm](https://img.shields.io/npm/v/audition.svg)
[![Build Status](https://travis-ci.org/vinsonchuong/audition.svg?branch=master)](https://travis-ci.org/vinsonchuong/audition)
[![dependencies Status](https://david-dm.org/vinsonchuong/audition/status.svg)](https://david-dm.org/vinsonchuong/audition)
[![devDependencies Status](https://david-dm.org/vinsonchuong/audition/dev-status.svg)](https://david-dm.org/vinsonchuong/audition?type=dev)

Design, prototype, and verify code

## Usage
Install [audition](https://yarnpkg.com/en/package/audition)
by running:

```sh
yarn add audition
```

Write test cases in e.g. `math.test.js`:

```js
import { example } from 'audition'
import assert from 'assert'

example('doing math', () => {
  assert(1 + 1 === 2)
})

example('doing math incorrectly', () => {
  assert(1 + 1 === 3)
})
```

Execute the test cases:

```sh
yarn audition math.test.mjs
```

View additional documentation:

```sh
yarn audition --help
```
