import {
  RVAccountingProviders,
  RVBankingProviders,
  RVReportFrequency,
  RVReportTypes,
  RVSandboxProviders,
} from "@railzai/railz-visualizations";
import React, { useState } from "react";
import { FormProps } from "../../../types/form";

const arrayServiceProviders = [
  ...Object.values(RVSandboxProviders),
  ...Object.values(RVBankingProviders),
  ...Object.values(RVAccountingProviders),
];
const arrayAllReportTypes = Object.values(RVReportTypes);
const arrayReportFrequency = Object.values(RVReportFrequency);
const arrayColors = ["red,blue,green", "yellow,blue,green"];
const requiresNoFrequency = (type: string) =>
  [
    RVReportTypes.INVOICES,
    RVReportTypes.BILLS,
    RVReportTypes.BANK_ACCOUNT,
    RVReportTypes.CREDIT_SCORE,
  ].includes(type as RVReportTypes);
const requiresNoDate = (type: string) =>
  [RVReportTypes.BANK_ACCOUNT, RVReportTypes.CREDIT_SCORE].includes(
    type as RVReportTypes
  );

export default function CustomizationForm({ setCustomization }: FormProps) {
  const [formCustomization, setFormCustomization] = useState<any>({
    filterBusinessName: "",
    filterServiceName: arrayServiceProviders[0],
    filterConnectionId: "",
    filterReportType: arrayAllReportTypes[0],
    filterReportFrequency: arrayReportFrequency[0],
    filterStartDate: "",
    filterEndDate: "",

    optionsContainerStyle: "",
    optionsContainerTooltip: "",
    optionsContainerDate: "",
    optionsTitleText: "",
    optionsTitleStyle: "",
    optionsChartColors: arrayColors[0],
    optionsChartStyleFontfamily: "",
    optionsChartStyleLabel: "",
    optionsChartStyleLegend: "",
    optionsChartStyleWidth: "",
    optionsChartStyleHeight: "",
    optionsChartDateQuarter: "",

    contentTitle: "",
    contentDateMonth: "MMM yyyy",
    contentDateQuarter: "Q",
    contentLabelDate: "As of",
  });

  const submitCustomization = (event: any) => {
    event.preventDefault();
    setCustomization(formCustomization);
  };

  const handleCustomizationChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormCustomization({ ...formCustomization, [name]: value });
  };

  return (
    <div className="flex flex-col">
      <div className="md:col-span-1">
        <div className="text-left">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Customization
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Customize here params you can send to the SDK.
          </p>
        </div>
      </div>
      <div className="mt-2 md:mt-2 md:col-span-2 text-left">
        <form onSubmit={submitCustomization} method="POST">
          <div className="overflow-hidden sm:rounded-md bg-white">
            <div className="grid grid-cols-6 gap-6 items-end">
              <div className="col-span-6 lg:col-span-6">
                <label
                  htmlFor="business-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Business Name
                </label>
                <input
                  id="business-name"
                  type="text"
                  name="filterBusinessName"
                  onChange={handleCustomizationChange}
                  value={formCustomization.filterBusinessName}
                  required={!formCustomization.filterConnectionId}
                  disabled={!!formCustomization.filterConnectionId}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="BIZ-1233"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="service-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Service Name
                </label>
                <select
                  id="service-name"
                  name="filterServiceName"
                  onChange={handleCustomizationChange}
                  value={formCustomization.serviceName}
                  required={
                    !formCustomization.filterConnectionId ||
                    !!formCustomization.filterBusinessName
                  }
                  disabled={!!formCustomization.filterConnectionId}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  {arrayServiceProviders.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="business-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Connection Id
                </label>
                <input
                  id="connection-id"
                  type="text"
                  name="filterConnectionId"
                  onChange={handleCustomizationChange}
                  value={formCustomization.filterConnectionId}
                  required={!formCustomization.filterBusinessName}
                  disabled={!!formCustomization.filterBusinessName}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="CON-12344"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="report-type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Report Type
                </label>
                <select
                  id="report-type"
                  name="filterReportType"
                  onChange={handleCustomizationChange}
                  value={formCustomization.filterReportType}
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option key="all" value="all">
                    all
                  </option>
                  {arrayAllReportTypes.map((reportType) => (
                    <option key={reportType} value={reportType}>
                      {reportType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  id="start-date"
                  type="date"
                  name="filterStartDate"
                  onChange={handleCustomizationChange}
                  value={formCustomization.filterStartDate}
                  required={!requiresNoDate(formCustomization.filterReportType)}
                  disabled={requiresNoDate(formCustomization.filterStartDate)}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="id_32"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="end-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  id="end-date"
                  type="date"
                  name="filterEndDate"
                  onChange={handleCustomizationChange}
                  value={formCustomization.filterEndDate}
                  required={!requiresNoDate(formCustomization.filterReportType)}
                  disabled={requiresNoDate(formCustomization.filterEndDate)}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="id_ww"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="report-frequency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Report Frequency
                </label>
                <select
                  id="report-frequency"
                  name="filterReportFrequency"
                  onChange={handleCustomizationChange}
                  value={formCustomization.filterReportFrequency}
                  required={
                    !requiresNoFrequency(formCustomization.filterReportType)
                  }
                  disabled={requiresNoFrequency(
                    formCustomization.filterReportFrequency
                  )}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  {arrayReportFrequency.map((freq) => (
                    <option key={freq} value={freq}>
                      {freq}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 lg:col-span-6">
                <hr />
              </div>
              <div className="col-span-6 lg:col-span-6">
                <label
                  htmlFor="options-chart-colors"
                  className="block text-sm font-medium text-gray-700"
                >
                  Colors
                </label>
                <select
                  id="options-chart-colors"
                  name="optionsChartColors"
                  onChange={handleCustomizationChange}
                  value={formCustomization.optionsChartColors}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  {arrayColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 lg:col-span-6">
                <hr />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="content-title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="content-title"
                  type="text"
                  name="contentTitle"
                  onChange={handleCustomizationChange}
                  value={formCustomization.contentTitle}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Title"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="content-date-month"
                  className="block text-sm font-medium text-gray-700"
                >
                  Month Format
                </label>
                <input
                  id="content-date-month"
                  type="text"
                  name="contentDateMonth"
                  onChange={handleCustomizationChange}
                  value={formCustomization.contentDateMonth}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="MMM yyyy"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="content-date-quarter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quarter Text
                </label>
                <input
                  id="content-date-quarter"
                  type="text"
                  name="contentDateQuarter"
                  onChange={handleCustomizationChange}
                  value={formCustomization.contentDateQuarter}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Q"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="content-label-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  id="content-label-date"
                  type="text"
                  name="contentLabelDate"
                  onChange={handleCustomizationChange}
                  value={formCustomization.contentLabelDate}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="As of"
                />
              </div>
              <div className="col-span-6 lg:col-span-6 items-end">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full place-items-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
