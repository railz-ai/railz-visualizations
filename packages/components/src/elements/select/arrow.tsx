/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { h } from '@stencil/core';

export function Arrow({
  style,
  up = false,
}: {
  up?: boolean;
  style?: { [key: string]: any };
}): HTMLOrSVGElement {
  return (
    <div
      style={{
        transform: up ? 'rotate(180deg)' : 'rotate(0deg)',
        width: '24px',
        height: '24px',
        ...style,
      }}
    >
      <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 10l5 5 5-5z"></path>
      </svg>
    </div>
  );
}
