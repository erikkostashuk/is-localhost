# localhost-check

[![npm version](https://img.shields.io/npm/v/localhost-check.svg)](https://www.npmjs.com/package/localhost-check)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A zero-dependency TypeScript/JavaScript library to check if a string or URL refers to localhost.

## Installation

```bash
npm install localhost-check
```

## Usage

```javascript
import { isLocalhost } from 'localhost-check';
// or
const { isLocalhost } = require('localhost-check');

// Direct localhost strings
console.log(isLocalhost('localhost'));        // true
console.log(isLocalhost('127.0.0.1'));        // true
console.log(isLocalhost('::1'));              // true

// URLs with localhost
console.log(isLocalhost('http://localhost:3000'));           // true
console.log(isLocalhost('https://127.0.0.1:8080/path'));    // true
console.log(isLocalhost('http://[::1]:4000'));              // true

// Other loopback addresses
console.log(isLocalhost('127.0.0.2'));        // true (any 127.x.x.x)

// Non-localhost values
console.log(isLocalhost('example.com'));      // false
console.log(isLocalhost('192.168.1.1'));      // false
console.log(isLocalhost('http://google.com')); // false

// Invalid input
console.log(isLocalhost(''));                 // false
console.log(isLocalhost(null));               // false
console.log(isLocalhost('not a url'));        // false
```

## API

### `isLocalhost(input: string): boolean`

Checks if the input string represents localhost.

**Parameters:**
- `input` - The string to check. Can be:
  - A hostname: `'localhost'`
  - An IPv4 address: `'127.0.0.1'` or any `127.x.x.x`
  - An IPv6 address: `'::1'`
  - A URL with any of the above as the host

**Returns:**
- `true` if the input refers to localhost
- `false` otherwise (including for malformed input)

## Features

- ✅ Zero dependencies
- ✅ TypeScript support with type declarations
- ✅ Works in both Node.js and browser environments
- ✅ Handles malformed input gracefully
- ✅ Recognizes all loopback addresses (127.0.0.0/8 range)
- ✅ Supports URLs with ports and paths

## Support

If you find this package useful, consider buying me a coffee! ☕

[![Support me on Ko-fi](https://img.shields.io/badge/Support%20me-Ko--fi-FF5E5B?logo=ko-fi)](https://coff.ee/devwitherik)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [devwitherik](https://github.com/devwitherik)
