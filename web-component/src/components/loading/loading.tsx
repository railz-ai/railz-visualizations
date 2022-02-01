import { FunctionalComponent, h } from '@stencil/core';

interface LoadingProps {
  loading: string;
}

export const Loading: FunctionalComponent<LoadingProps> = ({ loading }) => {
  return (
    <div>
      <progress class="progress" />
      <p>{loading}</p>
    </div>
  );
};
