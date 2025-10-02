// Lightweight error reporting utility used by ErrorBoundary
// Provides a stable API for capturing errors and returning an error id

type ExtraContext = Record<string, unknown> | undefined;

function generateErrorId(): string {
  // Time-based + random suffix for uniqueness without heavy deps
  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `ERR-${time}-${rand}`.toUpperCase();
}

function safeLog(message: string, payload?: unknown) {
  try {
    // eslint-disable-next-line no-console
    console.error(message, payload ?? '');
  } catch {}
}

export const errorReporting = {
  captureError(error: unknown, source: string, extra: ExtraContext = undefined): string {
    const errorId = generateErrorId();
    const payload = {
      errorId,
      source,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      extra,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      timestamp: new Date().toISOString(),
    };

    // In this minimal implementation, we just log. You can wire this to Sentry/Logtail/etc.
    safeLog('[ErrorReporting] Captured error', payload);

    return errorId;
  },
};

export default errorReporting;


