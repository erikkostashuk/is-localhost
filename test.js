// Comprehensive test suite for is-localhost
const { isLocalhost } = require('./dist/index.js');

const tests = [
  // Basic localhost strings
  { input: 'localhost', expected: true, description: 'Basic localhost string' },
  { input: 'LOCALHOST', expected: true, description: 'Uppercase localhost' },
  { input: 'LocalHost', expected: true, description: 'Mixed case localhost' },
  { input: ' localhost ', expected: true, description: 'Localhost with spaces' },
  { input: '\tlocalhost\n', expected: true, description: 'Localhost with tabs/newlines' },
  
  // IPv4 loopback addresses
  { input: '127.0.0.1', expected: true, description: 'Standard loopback IP' },
  { input: '127.0.0.0', expected: true, description: 'Start of loopback range' },
  { input: '127.255.255.255', expected: true, description: 'End of loopback range' },
  { input: '127.1.2.3', expected: true, description: 'Random loopback IP' },
  { input: '127.100.50.25', expected: true, description: 'Another loopback IP' },
  
  // IPv6 loopback
  { input: '::1', expected: true, description: 'IPv6 loopback short form' },
  { input: '0000:0000:0000:0000:0000:0000:0000:0001', expected: true, description: 'IPv6 loopback long form' },
  
  // URLs with localhost
  { input: 'http://localhost', expected: true, description: 'HTTP localhost URL' },
  { input: 'https://localhost', expected: true, description: 'HTTPS localhost URL' },
  { input: 'http://localhost:3000', expected: true, description: 'Localhost with port' },
  { input: 'http://localhost:8080/path/to/resource', expected: true, description: 'Localhost with path' },
  { input: 'https://localhost:443/api?key=value', expected: true, description: 'Localhost with query' },
  { input: 'ftp://localhost', expected: true, description: 'FTP protocol' },
  { input: 'ws://localhost:8080', expected: true, description: 'WebSocket protocol' },
  
  // URLs with IP addresses
  { input: 'http://127.0.0.1', expected: true, description: 'HTTP with loopback IP' },
  { input: 'https://127.0.0.1:8443', expected: true, description: 'HTTPS with loopback IP and port' },
  { input: 'http://127.0.0.2:9000/test', expected: true, description: 'HTTP with non-standard loopback' },
  
  // IPv6 URLs
  { input: 'http://[::1]', expected: true, description: 'IPv6 URL basic' },
  { input: 'http://[::1]:8080', expected: true, description: 'IPv6 URL with port' },
  { input: 'https://[::1]:443/path', expected: true, description: 'IPv6 URL with path' },
  
  // Edge cases - should return false
  { input: '', expected: false, description: 'Empty string' },
  { input: ' ', expected: false, description: 'Just whitespace' },
  { input: 'null', expected: false, description: 'String "null"' },
  { input: 'undefined', expected: false, description: 'String "undefined"' },
  
  // Non-localhost hostnames
  { input: 'example.com', expected: false, description: 'Regular domain' },
  { input: 'localhost.com', expected: false, description: 'Domain containing localhost' },
  { input: 'notlocalhost', expected: false, description: 'String containing localhost' },
  { input: 'localhos', expected: false, description: 'Partial localhost' },
  { input: 'localhostt', expected: false, description: 'Localhost with extra char' },
  
  // Non-loopback IPs
  { input: '192.168.1.1', expected: false, description: 'Private IP' },
  { input: '10.0.0.1', expected: false, description: 'Private IP range' },
  { input: '172.16.0.1', expected: false, description: 'Private IP range' },
  { input: '128.0.0.1', expected: false, description: 'Public IP (not loopback)' },
  { input: '126.255.255.255', expected: false, description: 'Just before loopback range' },
  { input: '128.0.0.0', expected: false, description: 'Just after loopback range' },
  
  // Invalid URLs
  { input: 'not a url', expected: false, description: 'Invalid URL format' },
  { input: 'http://', expected: false, description: 'Incomplete URL' },
  { input: '://localhost', expected: false, description: 'Missing protocol' },
  { input: 'http://google.com', expected: false, description: 'External URL' },
  { input: 'https://127.0.0.1.com', expected: false, description: 'Domain that looks like IP' },
  
  // Invalid IPs
  { input: '127.0.0.256', expected: false, description: 'Invalid IP (out of range)' },
  { input: '127.0.0', expected: false, description: 'Incomplete IP' },
  { input: '127.0.0.0.1', expected: false, description: 'Too many octets' },
  { input: '127.a.0.1', expected: false, description: 'Non-numeric IP' },
];

// Test type checking
const typeTests = [
  { input: null, expected: false, description: 'null input' },
  { input: undefined, expected: false, description: 'undefined input' },
  { input: 123, expected: false, description: 'number input' },
  { input: true, expected: false, description: 'boolean input' },
  { input: {}, expected: false, description: 'object input' },
  { input: [], expected: false, description: 'array input' },
];

console.log('Running is-localhost test suite...\n');

let passed = 0;
let failed = 0;

// Run main tests
console.log('=== Main Tests ===');
tests.forEach(({ input, expected, description }) => {
  const result = isLocalhost(input);
  const status = result === expected ? '✓' : '✗';
  
  if (result === expected) {
    passed++;
    if (process.env.VERBOSE) {
      console.log(`${status} ${description}: isLocalhost('${input}') = ${result}`);
    }
  } else {
    failed++;
    console.log(`${status} ${description}: isLocalhost('${input}') = ${result}, expected ${expected}`);
  }
});

// Run type tests (wrapped in try-catch since they might throw)
console.log('\n=== Type Safety Tests ===');
typeTests.forEach(({ input, expected, description }) => {
  try {
    const result = isLocalhost(input);
    const status = result === expected ? '✓' : '✗';
    
    if (result === expected) {
      passed++;
      if (process.env.VERBOSE) {
        console.log(`${status} ${description}: isLocalhost(${input}) = ${result}`);
      }
    } else {
      failed++;
      console.log(`${status} ${description}: isLocalhost(${input}) = ${result}, expected ${expected}`);
    }
  } catch (error) {
    failed++;
    console.log(`✗ ${description}: threw error: ${error.message}`);
  }
});

// Summary
console.log(`\n=== Test Summary ===`);
console.log(`Total tests: ${passed + failed}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Success rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

if (failed > 0) {
  console.log('\n❌ Test suite failed');
  process.exit(1);
} else {
  console.log('\n✅ All tests passed!');
}
