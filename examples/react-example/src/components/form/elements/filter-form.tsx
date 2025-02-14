import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import {
  RVAccountingProviders,
  RVBankingProviders,
  RVReportFrequency,
  RVReportTypes,
} from '@railzai/railz-visualizations';

import { FormProps } from '../../../types/form';

// TODO: this can be helper functions and objects the SDK provides
// This is still not possible: https://github.com/ionic-team/stencil/issues/2865
const arrayServiceProviders = [
  ...Object.values(RVBankingProviders),
  ...Object.values(RVAccountingProviders),
];
const arrayAllReportTypes = Object.values(RVReportTypes);
const arrayReportFrequency = Object.values(RVReportFrequency);
const requiresNoFrequency = (type: RVReportTypes) =>
  [
    RVReportTypes.INVOICES,
    RVReportTypes.BILLS,
    RVReportTypes.BANK_ACCOUNT,
    RVReportTypes.CREDIT_SCORE,
    RVReportTypes.TAX_BENCHMARKING,
  ].includes(type);

const requiresNoEndDate = (type: RVReportTypes) => [RVReportTypes.BANK_ACCOUNT].includes(type);

const optionalEndDate = (type: RVReportTypes) =>
  [RVReportTypes.BANK_ACCOUNT, RVReportTypes.CREDIT_SCORE].includes(type);

const requiresNoStartDate = (type: RVReportTypes) =>
  [RVReportTypes.BANK_ACCOUNT, RVReportTypes.CREDIT_SCORE, RVReportTypes.TAX_BENCHMARKING].includes(
    type,
  );

export default function FilterForm({ setFilter }: FormProps) {
  const [formFilter, setFormFilter] = useState({
    connectionUuid: '',
    reportType: arrayAllReportTypes[0],
    reportFrequency: arrayReportFrequency[0],
    startDate: '',
    endDate: '',
    region: '',
    industryCode: '',
  });

  const submitFilter: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setFilter(formFilter);
  };

  const handleFilterChange: ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormFilter({ ...formFilter, [name]: value });
  };

  return (
    <div className="flex flex-col">
      <div className="md:col-span-1">
        <div className="text-left">
          <h2 className="text-lg font-medium leading-6 text-gray-900">Filters</h2>
          <p className="mt-1 text-sm text-gray-600">
            Some fields are disabled based on criteria{' '}
            <a
              href="https://docs.railz.ai/docs/visualization-sdk-components"
              target="_blank"
              className="underline"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>
          <p className="mt-1 text-sm text-gray-600 font-bold">
            SDK current release only works with report types (balanceSheets, bankAccounts, bills,
            cashflowStatements, expenses, financialRatios, incomeStatements, invoices, revenue and
            creditScore).
          </p>
        </div>
      </div>
      <div className="mt-2 md:mt-2 md:col-span-2 text-left">
        <form onSubmit={submitFilter} method="POST">
          <div className="overflow-hidden sm:rounded-md bg-white">
            <div className="grid grid-cols-6 gap-6 items-end">
              {/* <div className="col-span-6 lg:col-span-6">
                <label htmlFor="business-name" className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  id="business-name"
                  onChange={handleFilterChange}
                  value={formFilter.businessName}
                  required={!formFilter.connectionUuid}
                  disabled={!!formFilter.connectionUuid}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="BIZ-1233"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label htmlFor="service-name" className="block text-sm font-medium text-gray-700">
                  Service Name
                </label>
                <select
                  id="service-name"
                  name="serviceName"
                  value={formFilter.serviceName}
                  required={!formFilter.connectionUuid || !!formFilter.businessName}
                  disabled={!!formFilter.connectionUuid}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  {arrayServiceProviders.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="col-span-6 lg:col-span-3">
                <label htmlFor="business-name" className="block text-sm font-medium text-gray-700">
                  Connection Id
                </label>
                <input
                  type="text"
                  name="connectionUuid"
                  id="connection-id"
                  onChange={handleFilterChange}
                  value={formFilter.connectionUuid}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="CON-12344"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">
                  Report Type
                </label>
                <select
                  id="report-type"
                  name="reportType"
                  onChange={handleFilterChange}
                  required
                  value={formFilter.reportType}
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
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="start-date"
                  onChange={handleFilterChange}
                  value={formFilter.startDate}
                  required={!requiresNoStartDate(formFilter.reportType)}
                  disabled={requiresNoStartDate(formFilter.reportType)}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="id_32"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="end-date"
                  onChange={handleFilterChange}
                  value={formFilter.endDate}
                  required={!optionalEndDate(formFilter.reportType)}
                  disabled={requiresNoEndDate(formFilter.reportType)}
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
                  name="reportFrequency"
                  onChange={handleFilterChange}
                  value={formFilter.reportFrequency}
                  required={!requiresNoFrequency(formFilter.reportType)}
                  disabled={requiresNoFrequency(formFilter.reportType)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  {arrayReportFrequency.map((freq) => (
                    <option key={freq} value={freq}>
                      {freq}
                    </option>
                  ))}
                </select>
              </div>
              {[RVReportTypes.TAX_BENCHMARKING, 'all'].includes(formFilter.reportType) && (
                <>
                  <div className="col-span-6 lg:col-span-3">
                    <label
                      htmlFor="business-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Industry Code
                    </label>
                    <input
                      type="text"
                      name="industryCode"
                      id="industry-code"
                      onChange={handleFilterChange}
                      value={formFilter.industryCode}
                      className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="33461"
                    />
                  </div>
                  <div className="col-span-6 lg:col-span-3">
                    <label
                      htmlFor="business-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Region
                    </label>
                    <input
                      type="text"
                      name="region"
                      id="region"
                      onChange={handleFilterChange}
                      value={formFilter.region}
                      className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="VA"
                    />
                  </div>
                </>
              )}

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
