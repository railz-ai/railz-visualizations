import React, { useState } from "react";
import {
  RVConfiguration,
  RVFilter,
  RVFilterDate,
  RVFilterFrequency,
  RVOptions,
  RVContent,
  RVReportFrequency,
  RVReportTypes,
  RVServiceProviders,
} from "@railzai/railz-visualizations";
import {
  RailzStatementsChart,
  RailzTransactionsControl,
  RailzVisualizations,
} from "@railzai/railz-visualizations-react";
import { isEmpty, pick } from "lodash";

type AllTypes = "all" & RVReportTypes;

interface Filter {
  businessName?: string;
  serviceName?: RVServiceProviders;
  connectionId?: string;
  startDate: string;
  endDate: string;
  reportFrequency: RVReportFrequency;
  reportType: AllTypes;
}

interface ChartProps {
  token: RVConfiguration;
  filter: Filter;
  options: RVOptions;
  content: RVContent;
  showCode?: boolean;
  displayValue?: string;
}
const formatCodeFilter = (filter: Filter) => {
  let allParameters;
  if (
    [RVReportTypes.BILLS, RVReportTypes.INVOICES].includes(filter.reportType)
  ) {
    if (!isEmpty(filter?.connectionId)) {
      allParameters = pick(filter, ["startDate", "endDate", "connectionId"]);
    } else {
      allParameters = pick(filter, [
        "startDate",
        "endDate",
        "businessName",
        "serviceName",
      ]);
    }
  } else {
    if (!isEmpty(filter?.connectionId)) {
      allParameters = pick(filter, [
        "startDate",
        "endDate",
        "reportFrequency",
        "connectionId",
      ]);
    } else {
      allParameters = pick(filter, [
        "startDate",
        "endDate",
        "reportFrequency",
        "businessName",
        "serviceName",
      ]);
    }
  }
  return allParameters;
};

const Code = ({
  token,
  filter,
  options,
  content,
  showCode,
  displayValue,
}: ChartProps) => {
  return (
    <>
      {showCode && (
        <pre className="language-html bg-black text-white mt-4 p-4 rounded-xl overflow-hidden">
          <code className="language-html">
            {"<" +
              displayValue +
              " configuration={" +
              JSON.stringify(
                { token: token.token.slice(0, 20) + "..." },
                null,
                "\t"
              ) +
              "} filter={" +
              JSON.stringify(formatCodeFilter(filter) as any, null, "\t") +
              `${
                options
                  ? "} options={" + JSON.stringify(options, null, "\t")
                  : ""
              }${
                content
                  ? "} content={" + JSON.stringify(content, null, "\t")
                  : ""
              }} />`}
          </code>
        </pre>
      )}
    </>
  );
};

const DefaultComponent = ({
  token,
  filter,
  options,
  content,
  showCode,
}: ChartProps) => {
  return (
    <div>
      <RailzVisualizations
        configuration={token}
        filter={filter as RVFilter}
        options={options}
        content={content}
      />
      <Code
        token={token}
        filter={filter}
        options={options}
        content={content}
        showCode={showCode}
        displayValue="RailzVisualizations"
      />
    </div>
  );
};

const Components = ({
  token,
  filter,
  options,
  content,
  showCode,
}: ChartProps) => {
  return (
    <div className="mt-5 md:grid md:grid-cols-1 md:gap-1">
      {/*Switch to Object.values(RVReportTypes) when all is implemented*/}
      {filter.reportType === "all" &&
        [
          RVReportTypes.BILLS,
          RVReportTypes.INVOICES,
          RVReportTypes.BALANCE_SHEET,
          RVReportTypes.INCOME_STATEMENTS,
          RVReportTypes.CASHFLOW_STATEMENTS,
        ].map((reportType) => (
          <div className="col-span-1" key={reportType}>
            <DefaultComponent
              token={token}
              filter={{ ...filter, reportType } as Filter}
              options={options}
              content={content}
              showCode={showCode}
            />
          </div>
        ))}
      {filter.reportType === "balanceSheets" && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">
            Using Railz Statements Chart Component
          </h4>
          <p>
            Railz Statements Chart Component only accepts <b>balanceSheets</b>,{" "}
            <b>cashflowStatements</b> and <b>incomeStatements</b>
          </p>
          <RailzStatementsChart
            configuration={token}
            filter={filter as RVFilterFrequency}
            options={options}
            content={content as RVContent}
          />
          <Code
            token={token}
            filter={filter}
            options={options}
            content={content}
            showCode={showCode}
            displayValue="RailzStatementsChart"
          />
        </div>
      )}
      {filter.reportType === "bills" && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">
            Using Railz Transactions Control Component
          </h4>
          <p>
            Railz Transactions Control Component only accepts <b>bills</b> and{" "}
            <b>invoices</b>
          </p>
          <RailzTransactionsControl
            configuration={token}
            filter={filter as RVFilterDate}
            options={options as RVOptions}
            content={content as RVContent}
          />
          <Code
            token={token}
            filter={filter}
            options={options}
            content={content}
            showCode={showCode}
            displayValue="RailzTransactionsControl"
          />
        </div>
      )}
      {!["balanceSheets", "bills", "all"].includes(filter.reportType) && (
        <DefaultComponent
          token={token}
          filter={filter}
          options={options}
          content={content}
          showCode={showCode}
        />
      )}
    </div>
  );
};
export default function Visualizations({
  token,
  filter,
  options,
  content,
}: ChartProps) {
  const [code, setCode] = useState(false);
  return (
    <div className="md:grid md:grid-cols-1 md:gap-1 text-left">
      <div className="col-span-1 inline-flex justify-end">
        <label htmlFor="switch-code">
          <input
            checked={code}
            onChange={() => setCode(!code)}
            className=" w-9 -ml-10 rounded-full h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-500 focus:outline-none cursor-pointer shadow-sm"
            type="checkbox"
            role="switch"
            id="switch-code"
          />
          <span className="text-gray-800 ml-2"> Show Code Example</span>
        </label>
      </div>
      <Components
        token={token}
        filter={filter}
        options={options}
        content={content}
        showCode={code}
      />
    </div>
  );
}
