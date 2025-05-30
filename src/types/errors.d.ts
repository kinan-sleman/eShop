export interface ErrorType {
  message: string;
  code?: string;
  status?: number;
  details?: string | number | object | null;
}

export type ErrorCallback = (error: ErrorType) => void;

export interface ApiError extends ErrorType {
  data?: Record<string, unknown>;
  response?: { status?: number; statusText?: string; };
}

export interface ValidationError extends ErrorType {
  field?: string;
  value?: unknown;
}

export interface NetworkError extends ErrorType {
  timeout?: boolean;
  offline?: boolean;
}
