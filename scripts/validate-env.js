const requiredCheckoutEnv = [
  'NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK',
  'NEXT_PUBLIC_STRIPE_PRO_LINK'
];

function isAbsoluteHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateEnvironment(
  env = process.env,
  { strict = Boolean(env.CI) || env.VALIDATE_ENV_MODE === 'strict' } = {}
) {
  const errors = [];
  const warnings = [];

  for (const key of requiredCheckoutEnv) {
    const value = env[key]?.trim();

    if (!value) {
      if (strict) {
        errors.push(`${key} is required in strict mode.`);
      } else {
        warnings.push(
          `${key} is not set. Checkout for this plan will be unavailable until configured.`
        );
      }
      continue;
    }

    if (!isAbsoluteHttpUrl(value)) {
      errors.push(`${key} must be an absolute http(s) URL.`);
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings
  };
}

export function formatValidationSummary(result) {
  const lines = [];

  if (!result.ok) {
    lines.push('Environment validation failed.');
  } else {
    lines.push('Environment validation passed.');
  }

  if (result.warnings.length > 0) {
    lines.push('Warnings:');
    lines.push(...result.warnings.map((warning) => `- ${warning}`));
  }

  if (result.errors.length > 0) {
    lines.push('Errors:');
    lines.push(...result.errors.map((error) => `- ${error}`));
  }

  return lines.join('\n');
}

const isDirectExecution = import.meta.url === new URL(process.argv[1], 'file:').href;

if (isDirectExecution) {
  const result = validateEnvironment();
  const summary = formatValidationSummary(result);
  const output = result.ok ? console.log : console.error;

  output(summary);

  if (!result.ok) {
    process.exitCode = 1;
  }
}
