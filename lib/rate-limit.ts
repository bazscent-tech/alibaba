// Client-side rate limiting for form submissions

const attempts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(action: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = attempts.get(action);

  if (!record || now > record.resetTime) {
    attempts.set(action, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxAttempts) {
    return false;
  }

  record.count++;
  return true;
}

export function getRemainingAttempts(action: string, maxAttempts: number = 5): number {
  const record = attempts.get(action);
  if (!record) return maxAttempts;
  return Math.max(0, maxAttempts - record.count);
}
