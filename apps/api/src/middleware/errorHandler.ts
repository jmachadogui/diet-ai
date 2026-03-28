import type { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly error: string,
    message: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotImplementedError extends AppError {
  constructor() {
    super(501, "NOT_IMPLEMENTED", "Not implemented");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(401, "UNAUTHORIZED", message);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(400, "BAD_REQUEST", message);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(409, "CONFLICT", message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(404, "NOT_FOUND", message);
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.error, message: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred" });
}
