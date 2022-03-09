import React from "react";
import { FormProps } from "../../types/form";
import AuthForm from "./elements/auth-form";
import FilterForm from "./elements/filter-form";
import OptionsForm from "./elements/options-form";

export default function Form({
  setFilter,
  setAuthentication,
  setError,
  options,
  setOptions,
}: FormProps) {
  return (
    <>
      <div className="mt-0">
        <AuthForm
          setFilter={setFilter}
          setAuthentication={setAuthentication}
          setError={setError}
        />
      </div>
      {options && (
        <div className="mt-4 sm:mt-4">
          <OptionsForm options={options} setOptions={setOptions} />
        </div>
      )}
      <div className="mt-4 sm:mt-4">
        <FilterForm
          setFilter={setFilter}
          setAuthentication={setAuthentication}
          setError={setError}
        />
      </div>
    </>
  );
}
