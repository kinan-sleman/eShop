export interface FirebaseError {
    code: number;
    message: string;
    errors?: Array<{
        message: string;
        domain: string;
        reason: string;
    }>;
}

export interface AppError extends Error {
    code?: number;
    errors?: Array<{
        message: string;
        domain: string;
        reason: string;
    }>;
}

export type AppErrorType = Error | FirebaseError;

export const isFirebaseError = (error: unknown): error is FirebaseError => {
    return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
};
