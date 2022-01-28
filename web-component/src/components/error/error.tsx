import { FunctionalComponent, h } from '@stencil/core';

interface ErrorProps {
  error: string;
}

export const Error: FunctionalComponent<ErrorProps> = ({ error }) => (
  <div class="error">
    <strong>Error!</strong> <span>{error}</span>
  </div>
);
