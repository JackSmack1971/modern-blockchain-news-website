export class BaseError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message);
    if (options?.cause) {
      // Add cause property for Node >= 16
      (this as unknown as { cause?: unknown }).cause = options.cause;
    }
    this.name = this.constructor.name;
  }
}

export class ValidationError extends BaseError {}

export class APIError extends BaseError {}
