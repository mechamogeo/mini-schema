import { StringType } from "./types/string";
import { NumberType } from "./types/number";
import { BooleanType } from "./types/boolean";
import { LiteralType, type LiteralValue } from "./types/literal";
import { EnumType } from "./types/enum";
import {
  CoercedStringType,
  CoercedNumberType,
  CoercedBooleanType,
} from "./types/coerce";

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
  enum: <T extends readonly [string | number, ...(string | number)[]]>(
    options: T,
  ) => new EnumType(options),

  /**
   * Coercion helpers - convert values to the target type
   */
  coerce,
} as const;

export { s as schema };
