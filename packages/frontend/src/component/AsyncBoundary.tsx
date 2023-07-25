import type { ReactNode, SuspenseProps } from 'react';
import { Suspense } from 'react';
import type { ErrorBoundaryPropsWithRender } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';

interface AsyncBoundaryProps
  extends Omit<
    ErrorBoundaryPropsWithRender,
    'fallbackRender' | 'fallback' | 'FallbackComponent'
  > {
  children?: ReactNode;
  errorFallback: ErrorBoundaryPropsWithRender['fallbackRender'];
  suspenseFallback: SuspenseProps['fallback'];
}

export function AsyncBoundary({
  children,
  errorFallback,
  suspenseFallback,
  ...errorBoundaryProps
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallbackRender={errorFallback} {...errorBoundaryProps}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
