# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-11

### Added
- Initial release
- `isLocalhost` function to check if a string or URL refers to localhost
- Support for direct hostname/IP checking
- Support for URL parsing and validation
- Full IPv4 loopback range support (127.0.0.0/8)
- IPv6 loopback support (::1)
- TypeScript declarations
- Zero dependencies
- Browser and Node.js compatibility
- Comprehensive test suite
- MIT license

### Features
- Handles "localhost", "127.0.0.1", "::1" directly
- Parses and validates URLs (e.g., http://localhost:3000)
- Recognizes entire 127.0.0.0/8 range as localhost
- Graceful handling of malformed input
- Case-insensitive matching
