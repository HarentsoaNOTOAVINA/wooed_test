import { describe, expect, it } from 'vitest';
import emailValidation from './email_validation';

const invalidEmail = <string>'invalid-email';
const validEmail = <string>'valid-email@test.com';
describe('email validation', () => {
    it('should return false', () => {
        expect(emailValidation(invalidEmail)).toBe(false);
    });

    it('should return true', () => {
        expect(emailValidation(validEmail)).toBe(true);
    });
});
