<p align="center">
  <img src="./assets/logo.svg" alt="schemini" height="60">
</p>

<p align="center">
  <strong>TypeScript-first schema validation with JSON Schema support</strong>
</p>

<p align="center">
  <a href="https://github.com/mechamogeo/schemini/actions/workflows/ci.yml">
    <img src="https://github.com/mechamogeo/schemini/actions/workflows/ci.yml/badge.svg" alt="CI">
  </a>
  <a href="https://www.npmjs.com/package/@schemini/core">
    <img src="https://img.shields.io/npm/v/@schemini/core.svg" alt="npm version">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.0+-blue.svg" alt="TypeScript">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
  </a>
</p>

---

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [@schemini/core](./packages/core) | [![npm](https://img.shields.io/npm/v/@schemini/core.svg)](https://www.npmjs.com/package/@schemini/core) | Core validation library |
| [@schemini/locale](./packages/locale) | [![npm](https://img.shields.io/npm/v/@schemini/locale.svg)](https://www.npmjs.com/package/@schemini/locale) | i18n support (pt-BR) |

## Install

```bash
npm install @schemini/core
```

## Quick Example

```typescript
import { s } from "@schemini/core";

// Define a schema with type inference
const userSchema = s.object({
  name: s.string().min(1),
  email: s.string().email(),
  age: s.number().int().positive().optional(),
});

// Infer the TypeScript type
type User = s.infer<typeof userSchema>;

// Parse and validate data
const user = userSchema.parse({
  name: "John",
  email: "john@example.com",
});
```

## Features

- **TypeScript-first** - Full type inference with `s.infer<>`
- **Zero dependencies** - Lightweight core (~15KB)
- **JSON Schema support** - Bidirectional conversion
- **Brazilian validators** - CPF, CNPJ, CEP built-in
- **Coercion** - Automatic type conversion for form data
- **i18n ready** - Customizable error messages

## Documentation

**[Read the full documentation →](https://github.com/mechamogeo/schemini/wiki)**

- [Getting Started](https://github.com/mechamogeo/schemini/wiki/Getting-Started)
- [API Reference](https://github.com/mechamogeo/schemini/wiki/API-Reference)
- [JSON Schema](https://github.com/mechamogeo/schemini/wiki/JSON-Schema)
- [Brazilian Validators](https://github.com/mechamogeo/schemini/wiki/Brazilian-Validators)
- [Error Handling](https://github.com/mechamogeo/schemini/wiki/Error-Handling)

## License

MIT
