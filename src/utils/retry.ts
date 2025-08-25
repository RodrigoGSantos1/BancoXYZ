import { NetworkError } from '../errors/AppError';

interface RetryConfig {
  maxAttempts?: number;
  delayMs?: number;
  backoffFactor?: number;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const { maxAttempts = 3, delayMs = 1000, backoffFactor = 2 } = config;

  let lastError: Error | null = null;
  let attempt = 1;

  while (attempt <= maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      if (!(error instanceof NetworkError) || attempt === maxAttempts) {
        throw error;
      }

      const delay = delayMs * Math.pow(backoffFactor, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt++;
    }
  }

  throw lastError;
}
