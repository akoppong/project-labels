export type ValidationResult = {
  ok: boolean;
  errors: string[];
  warnings: string[];
};

export function validateEnvironment(
  env?: NodeJS.ProcessEnv,
  options?: { strict?: boolean }
): ValidationResult;

export function formatValidationSummary(result: ValidationResult): string;
