export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    public message: string,
    public details?: any,
  ) {
    super(message)
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(401, 'UNAUTHORIZED', message)
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details: any) {
    super(400, 'VALIDATION_ERROR', message, details)
  }
}

export class UsernameAlreadyTakenError extends ApiError {
  constructor(message: string) {
    super(409, 'USERNAME_ALREADY_TAKEN', message)
  }
}

export class ResourceNotFoundError extends ApiError {
  constructor(message: string) {
    super(404, 'RESOURCE_NOT_FOUND', message)
  }
}
