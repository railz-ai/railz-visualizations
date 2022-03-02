import { AuthenticationParameters } from "./authentication";

export interface FormProps {
  setAuthentication: (params: AuthenticationParameters) => Promise<void>;
  setFilter: (filter: any) => void;
  setCustomization: (options: any) => void;
  setError: (value: string) => void;
  showCustomization?: boolean;
}
