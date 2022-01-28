import { FunctionalComponent, h } from '@stencil/core';

interface AlertProps {
  alert: string;
}

export const Alert: FunctionalComponent<AlertProps> = ({ alert }) => (
  <div class="alert">
    <strong>Alert!</strong> <span>{alert}</span>
  </div>
);
