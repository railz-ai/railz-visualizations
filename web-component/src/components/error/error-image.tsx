import { FunctionalComponent, h } from '@stencil/core';

interface Props {
  statusCode?: number;
  error: string;
}

const styles = { height: '57px' };

export const ErrorImage: FunctionalComponent<Props> = ({ statusCode = 0, error }: Props) => {
  switch (statusCode) {
    case 0:
    case 401:
      return (
        <div style={styles}>
          <img src="assets/images/status500.png" alt={''} />
          <p>{error}</p>
        </div>
      );
    case 404:
      return (
        <div style={styles}>
          <img src="assets/images/status404.png" alt={''} />
          <p>{error}</p>
        </div>
      );
    case 204:
      return (
        <div style={styles}>
          <img src="assets/images/status204.png" alt={''} />
          <p>{error}</p>
        </div>
      );
    case 202:
      return (
        <div style={styles}>
          <img src="assets/images/status202.png" alt={''} />
          <p>{error}</p>
        </div>
      );
    default:
      return <p>{error}</p>;
  }
};
