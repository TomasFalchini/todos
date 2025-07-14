export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: number;
  public errors?: string[];
  public context?: Record<string, any>;

  constructor(
    message: string,
    statusCode: number = 400,
    code: number = statusCode,
    errors?: string[],
    context?: Record<string, any>
  ) {
    super(message);
    this.name = 'Api Error';
    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;
    this.context = context;

    Error.captureStackTrace(this, this.constructor);
  }

  // Métodos de encadenamiento
  withContext(context: Record<string, any>): ApiError {
    this.context = { ...this.context, ...context };
    return this;
  }

  withErrors(errors: string[]): ApiError {
    this.errors = [...(this.errors || []), ...errors];
    return this;
  }

  static badRequest(message: string): ApiError {
    return new ApiError(message, 400, 400);
  }

  static notFound(message: string = 'Resource not found'): ApiError {
    return new ApiError(message, 404, 404);
  }

  static unauthorized(message: string = 'Unauthorized'): ApiError {
    return new ApiError(message, 401, 401);
  }

  static forbidden(message: string = 'Forbidden'): ApiError {
    return new ApiError(message, 403, 403);
  }

  static conflict(message: string): ApiError {
    return new ApiError(message, 409, 409);
  }

  static internal(message: string = 'Internal server error'): ApiError {
    return new ApiError(message, 500, 500);
  }

  static validation(message: string): ApiError {
    return new ApiError(message, 422, 422);
  }
}
