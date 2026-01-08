import { ArrayType } from './types/array';
import type { BaseType } from './types/base';
import { BooleanType } from './types/boolean';
import { CoercedBooleanType, CoercedNumberType, CoercedStringType } from './types/coerce';
import { EnumType } from './types/enum';
import { LiteralType, type LiteralValue } from './types/literal';
import { NumberType } from './types/number';
import { ObjectType, type Shape } from './types/object';
import { StringType } from './types/string';
import { UnionType } from './types/union';

/**
 * Coercion helpers - convert values to the target type
 */
const coerce = {
  /**
   * Create a coerced string schema (converts any value to string)
   */
  string: () => new CoercedStringType(),

  /**
   * Create a coerced number schema (converts string to number)
   */
  number: () => new CoercedNumberType(),

  /**
   * Create a coerced boolean schema (converts truthy/falsy to boolean)
   */
  boolean: () => new CoercedBooleanType(),
} as const;

/**
 * Schema factory - main entry point for creating schemas
 */
export const s = {
  /**
   * Create a string schema
   */
  string: () => new StringType(),

  /**
   * Create a number schema
   */
  number: () => new NumberType(),

  /**
   * Create a boolean schema
   */
  boolean: () => new BooleanType(),

  /**
   * Create a literal (exact value) schema
   */
  literal: <T extends LiteralValue>(value: T) => new LiteralType(value),

  /**
   * Create an enum schema
   */
  enum: <T extends readonly [string | number, ...(string | number)[]]>(options: T) =>
    new EnumType(options),

  /**
   * Create an object schema
   */
  object: <T extends Shape>(shape: T) => new ObjectType(shape),

  /**
   * Create an array schema
   */
  array: <T>(element: BaseType<T>) => new ArrayType(element),

  /**
   * Create a union schema (accepts any of the provided schemas)
   */
  // biome-ignore lint/suspicious/noExplicitAny: Required for type inference
  union: <T extends readonly BaseType<any>[]>(options: T) => new UnionType(options),

  /**
   * Coercion helpers - convert values to the target type
   */
  coerce,
} as const;

export { s as schema };
