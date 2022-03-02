import React, { useState } from "react";
import Header from "../../components/header";
import Form from "../../components/form/form";
import Visualizations from "../../components/visualizations";
import {
  RVContent,
  RVContentDate,
  RVContentLabel,
} from "@railzai/railz-visualizations";
import { AuthenticationParameters } from "../../types/authentication";
import { isEmpty } from "lodash";

export default function Customization() {
  const [token, setToken] = useState("");
  const [filter, setFilter] = useState({});
  const [options, setOptions] = useState({});
  const [content, setContent] = useState({});
  const [error, setError] = useState("");

  const submitAuthentication = async (
    params: AuthenticationParameters
  ): Promise<void> => {
    setError("");
    const response = await fetch(params.authUrl, { method: "GET" });
    if (!response.ok) {
      setError("Could not retrieve auth token");
      return;
    }
    const result = await response.json();
    setToken(result.access_token);
  };

  const submitCustomization = (data: any) => {
    setFilter({
      ...filter,
      businessName: data.filterBusinessName,
      serviceName: data.filterServiceName,
      startDate: data.filterStartDate,
      endDate: data.filterEndDate,
      reportType: data.filterReportType,
      reportFrequency: data.filterReportFrequency,
    });

    setOptions({
      ...options,
      colors: data.optionsChartColors?.split(","),
    });

    const date = {
      month: data.contentDateMonth,
      quarter: data.contentDateQuarter,
    } as RVContentDate;

    const label = {
      date: data.contentLabelDate,
    } as RVContentLabel;

    setContent({
      ...content,
      title: data.contentTitle,
      date,
      label,
    });
    setError("");
    if (!token) {
      setError("Token required before filter can be triggered.");
    }
  };

  return (
    <div className="App">
      <Header
        description={
          "This page shows you the customizable options that can be passed to the SDK."
        }
        children={
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1 shadow p-4">
              <Form
                setAuthentication={submitAuthentication}
                setFilter={() => {}}
                setCustomization={submitCustomization}
                setError={setError}
                showCustomization={true}
              />
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              {!token && "No Token, submit your authentication details"}
              {token &&
                isEmpty(filter) &&
                "No Filter, submit your filter details"}
              {token && !isEmpty(filter) && (
                <Visualizations
                  token={{ token }}
                  filter={filter as any}
                  options={options}
                  content={content as RVContent}
                />
              )}

              {error && (
                <p className="mt-5 md:mt-0 md:col-span-2 text-red-700">
                  {error}
                </p>
              )}
            </div>
          </div>
        }
      />
    </div>
  );
}
