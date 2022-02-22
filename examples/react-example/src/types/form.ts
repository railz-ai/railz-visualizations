import {AuthenticationParameters} from "./authentication";

export interface FormProps {
    setFilter: (filter: any) => void;
    setAuthentication: (params: AuthenticationParameters) => Promise<void>;
    setError: (value: string) => void;
}