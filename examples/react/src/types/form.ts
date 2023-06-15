import { RVOptions } from '@railzai/railz-visualizations';

export interface OptionFormProps {
  setOptions?: (params: any) => void;
  options?: RVOptions;
}

export interface AuthFormProps {
  setError: ((value: string) => void) | undefined;
  setToken: (accessToken: string) => void;
}

export interface FilterFormProps {
  setFilter: ((filter: any) => void) | undefined;
}

export interface FormProps extends OptionFormProps, AuthFormProps, FilterFormProps {}
