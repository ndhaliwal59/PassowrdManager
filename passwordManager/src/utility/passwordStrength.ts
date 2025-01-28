export function calculatePasswordStrength(password: string): string {
  const length = password.length;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  let poolSize = 0;
  if (hasLowercase) poolSize += 26;
  if (hasUppercase) poolSize += 26;
  if (hasNumbers) poolSize += 10;
  if (hasSymbols) poolSize += 32;

  const entropy = Math.log2(Math.pow(poolSize, length));

  if (entropy < 28) return "Very Weak";
  if (entropy < 36) return "Weak";
  if (entropy < 60) return "Moderate";
  if (entropy < 128) return "Strong";
  return "Very Strong";
}
