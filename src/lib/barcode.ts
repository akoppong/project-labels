export type ValidationResult =
  | { valid: true }
  | { valid: false; reason: string };

export function validateCode128(value: string): ValidationResult {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return {
      valid: false,
      reason: 'Barcode value is required.'
    };
  }

  if (!/^[\x20-\x7E]+$/.test(trimmed)) {
    return {
      valid: false,
      reason: 'Use printable characters only.'
    };
  }

  return { valid: true };
}
