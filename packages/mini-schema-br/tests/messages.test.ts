import { resetErrorMap, s, setErrorMap } from 'mini-schema';
import { describe, expect, it } from 'vitest';
import { portugueseErrorMap, ptBRErrorMap } from '../src/index.js';

describe('ptBRErrorMap', () => {
  it('should be exported as portugueseErrorMap alias', () => {
    expect(ptBRErrorMap).toBe(portugueseErrorMap);
  });

  describe('invalid_type errors', () => {
    it('should translate type errors to Portuguese', () => {
      setErrorMap(ptBRErrorMap);

      const schema = s.string();
      const result = schema.safeParse(123);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Esperado texto, recebido número');
      }

      resetErrorMap();
    });

    it('should translate integer type errors', () => {
      setErrorMap(ptBRErrorMap);

      const schema = s.number().int();
      const result = schema.safeParse(1.5);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Esperado inteiro, recebido decimal');
      }

      resetErrorMap();
    });

    it('should translate boolean type errors', () => {
      setErrorMap(ptBRErrorMap);

      const schema = s.boolean();
      const result = schema.safeParse('true');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Esperado booleano, recebido texto');
      }

      resetErrorMap();
    });
  });

  describe('too_small errors', () => {
    it('should translate string min length errors', () => {
      setErrorMap(ptBRErrorMap);

      const schema = s.string().min(5);
      const result = schema.safeParse('abc');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Texto deve conter pelo menos 5 caracteres');
      }

      resetErrorMap();
    });

    it('should handle singular character', () => {
      setErrorMap(ptBRErrorMap);

      const schema = s.string().min(1);
      const result = schema.safeParse('');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Texto deve conter pelo menos 1 caractere');
      }

      resetErrorMap();
    });

    it('should translate array min length errors', () => {
      const schema = s.array(s.string()).min(2);
      const result = schema.safeParse(['one'], { errorMap: ptBRErrorMap });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Array deve conter pelo menos 2 elementos');
      }
    });

    it('should translate number minimum errors', () => {
      setErrorMap(ptBRErrorMap);

      const schema = s.number().min(10);
      const result = schema.safeParse(5);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Valor deve ser maior ou igual a 10');
      }

      resetErrorMap();
    });
  });

  describe('too_big errors', () => {
    it('should translate string max length errors', () => {
      setErrorMap(ptBRErrorMap);

      const schema = s.string().max(3);
      const result = schema.safeParse('hello');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Texto deve conter no máximo 3 caracteres');
      }

      resetErrorMap();
    });

    it('should translate array max length errors', () => {
      const schema = s.array(s.number()).max(2);
      const result = schema.safeParse([1, 2, 3], { errorMap: ptBRErrorMap });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Array deve conter no máximo 2 elementos');
      }
    });

    it('should translate number maximum errors', () => {
      setErrorMap(ptBRErrorMap);

      const schema = s.number().max(100);
      const result = schema.safeParse(150);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('Valor deve ser menor ou igual a 100');
      }

      resetErrorMap();
    });
  });

  describe('invalid_string errors', () => {
    it('should translate email format errors', () => {
      setErrorMap(ptBRErrorMap);

      const schema = s.string().email();
      const result = schema.safeParse('invalid');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('E-mail inválido');
      }

      resetErrorMap();
    });

    it('should translate uuid format errors', () => {
      setErrorMap(ptBRErrorMap);

      const schema = s.string().uuid();
      const result = schema.safeParse('not-a-uuid');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toBe('UUID inválido');
      }

      resetErrorMap();
    });
  });

  describe('invalid_enum errors', () => {
    it('should translate enum errors', () => {
      setErrorMap(ptBRErrorMap);

      const schema = s.enum(['admin', 'user'] as const);
      const result = schema.safeParse('guest');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toContain('Valor inválido');
        expect(result.error.message).toContain('admin, user');
      }

      resetErrorMap();
    });
  });

  describe('invalid_literal errors', () => {
    it('should translate literal errors', () => {
      setErrorMap(ptBRErrorMap);

      const schema = s.literal('active');
      const result = schema.safeParse('inactive');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toContain('Valor literal inválido');
      }

      resetErrorMap();
    });
  });
});
