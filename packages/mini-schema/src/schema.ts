import { StringType } from "./types/string";
import { NumberType } from "./types/number";
import { BooleanType } from "./types/boolean";
import { LiteralType, type LiteralValue } from "./types/literal";
import { EnumType } from "./types/enum";

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
} as const;

export { s as schema };
