import React from "react";
import { FormProps } from "../../types/form";
import AuthForm from "./elements/auth-form";
import FilterForm from "./elements/filter-form";
import CustomizationForm from "./elements/customization-form";

export default function Form({
  setAuthentication,
  setFilter,
  setCustomization,
  setError,
  showCustomization = false,
}: FormProps) {
  return (
    <>
      <div className="mt-0">
        <AuthForm
          setAuthentication={setAuthentication}
          setFilter={setFilter}
          setCustomization={setCustomization}
          setError={setError}
        />
      </div>

      {showCustomization ? (
        <div className="mt-4 sm:mt-4">
          <CustomizationForm
            setAuthentication={setAuthentication}
            setFilter={setFilter}
            setCustomization={setCustomization}
            setError={setError}
          />
        </div>
      ) : (
        <div className="mt-4 sm:mt-4">
          <FilterForm
            setAuthentication={setAuthentication}
            setFilter={setFilter}
            setCustomization={setCustomization}
            setError={setError}
          />
        </div>
      )}
    </>
  );
}
