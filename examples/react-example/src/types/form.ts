import {AuthenticationParameters} from "./authentication";
import {RVOptions} from "@railzai/railz-visualizations/src";

export interface OptionFormProps {
    setOptions?: (params: any) => void;
    options?: RVOptions;
}

export interface FormProps extends OptionFormProps {
    setFilter: (filter: any) => void;
    setAuthentication: (params: AuthenticationParameters) => Promise<void>;
    setError: (value: string) => void;
}
