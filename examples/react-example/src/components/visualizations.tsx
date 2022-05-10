import React, { useState } from 'react';
import {
  RVConfiguration,
  RVOptions,
  RVReportFrequency,
  RVReportTypes,
  RVServiceProviders,
  RVFilterFinancialRatio,
  RVFilterPie,
  RVFilterStatements,
  RVFilterTransactions,
  RVFilterAll,
} from '@railzai/railz-visualizations';
import {
  RailzFinancialRatios,
  RailzGaugeChart,
  RailzPieChart,
  RailzStatementsChart,
  RailzTransactionsControl,
  RailzVisualizations,
} from '@railzai/railz-visualizations-react';
import { cloneDeep, isEmpty, pick } from 'lodash';
import { RVFilterGauge } from '@railzai/railz-visualizations/src';

type AllTypes = 'all' & RVReportTypes;

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
  configuration: RVConfiguration;
  filter: Filter;
  options?: RVOptions;
  showCode?: boolean;
  displayValue?: string;
}
const formatCodeFilter = (filter: Filter) => {
  let allParameters;
  if ([RVReportTypes.BILLS, RVReportTypes.INVOICES].includes(filter.reportType)) {
    if (!isEmpty(filter?.connectionId)) {
      allParameters = pick(filter, ['startDate', 'endDate', 'reportType', 'connectionId']);
    } else {
      allParameters = pick(filter, [
        'startDate',
        'endDate',
        'businessName',
        'reportType',
        'serviceName',
      ]);
    }
  } else {
    if (!isEmpty(filter?.connectionId)) {
      allParameters = pick(filter, [
        'startDate',
        'endDate',
        'reportFrequency',
        'reportType',
        'connectionId',
      ]);
    } else {
      allParameters = pick(filter, [
        'startDate',
        'endDate',
        'reportFrequency',
        'reportType',
        'businessName',
        'serviceName',
      ]);
    }
  }
  return allParameters;
};

const Code = ({ configuration, filter, options, showCode, displayValue }: ChartProps) => {
  return (
    <>
      {showCode && (
        <pre className="language-html bg-black text-white mt-4 p-4 rounded-xl overflow-hidden">
          <code className="language-html">
            {'<' +
              displayValue +
              ' configuration={' +
              JSON.stringify({ token: configuration.token.slice(0, 20) + '...' }, null, '\t') +
              '} filter={' +
              JSON.stringify(formatCodeFilter(filter) as any, null, '\t') +
              `${options ? '} options={' + JSON.stringify(options, null, '\t') : ''}} />`}
          </code>
        </pre>
      )}
    </>
  );
};

const DefaultComponent = ({ configuration, filter, options, showCode }: ChartProps) => {
  return (
    <div>
      <RailzVisualizations
        configuration={configuration}
        filter={filter as unknown as RVFilterAll}
        options={options}
      />
      <Code
        configuration={configuration}
        filter={filter}
        options={options}
        showCode={showCode}
        displayValue="RailzVisualizations"
      />
    </div>
  );
};

const Components = ({ configuration, filter, options, showCode }: ChartProps) => {
  return (
    <div className="mt-5 md:grid md:grid-cols-1 md:gap-1">
      {/*Switch to Object.values(RVReportTypes) when all is implemented*/}
      {filter.reportType === 'all' &&
        [
          RVReportTypes.BILLS,
          RVReportTypes.INVOICES,
          RVReportTypes.BALANCE_SHEET,
          RVReportTypes.INCOME_STATEMENTS,
          RVReportTypes.CASHFLOW_STATEMENTS,
          RVReportTypes.EXPENSES,
          RVReportTypes.REVENUE,
          RVReportTypes.RAILZ_SCORE,
          RVReportTypes.FINANCIAL_RATIO,
        ].map((reportType) => (
          <div className="col-span-1 mt-1" key={reportType}>
            <DefaultComponent
              configuration={configuration}
              filter={cloneDeep({ ...filter, reportType }) as Filter}
              options={cloneDeep(options)}
              showCode={showCode}
            />
          </div>
        ))}
      {[RVReportTypes.RAILZ_SCORE].includes(filter.reportType) && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">Using Railz Gauge Chart Component</h4>
          <p>
            Railz Gauge Chart Component only accepts <b>railzScore</b>
          </p>
          <RailzGaugeChart
            configuration={configuration}
            filter={filter as RVFilterGauge}
            options={options}
          />
          <Code
            configuration={configuration}
            filter={filter}
            options={options}
            showCode={showCode}
            displayValue="RailzGaugeChart"
          />
        </div>
      )}
      {[RVReportTypes.EXPENSES, RVReportTypes.REVENUE].includes(filter.reportType) && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">Using Railz Pie Chart Component</h4>
          <p>
            Railz Pie Chart Component only accepts <b>expenses</b> and <b>revenues</b>
          </p>
          <RailzPieChart
            configuration={configuration}
            filter={filter as RVFilterPie}
            options={options}
          />
          <Code
            configuration={configuration}
            filter={filter}
            options={options}
            showCode={showCode}
            displayValue="RailzPieChart"
          />
        </div>
      )}
      {[
        RVReportTypes.BALANCE_SHEET,
        RVReportTypes.CASHFLOW_STATEMENTS,
        RVReportTypes.INCOME_STATEMENTS,
      ].includes(filter.reportType) && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">
            Using Railz Statements Chart Component
          </h4>
          <p>
            Railz Statements Chart Component only accepts <b>balanceSheets</b>,{' '}
            <b>cashflowStatements</b> and <b>incomeStatements</b>
          </p>
          <RailzStatementsChart
            configuration={configuration}
            filter={filter as RVFilterStatements}
            options={options}
          />
          <Code
            configuration={configuration}
            filter={filter}
            options={options}
            showCode={showCode}
            displayValue="RailzStatementsChart"
          />
        </div>
      )}
      {[RVReportTypes.BILLS, RVReportTypes.INVOICES].includes(filter.reportType) && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">
            Using Railz Transactions Control Component
          </h4>
          <p>
            Railz Transactions Control Component only accepts <b>bills</b> and <b>invoices</b>
          </p>
          <RailzTransactionsControl
            configuration={configuration}
            filter={filter as RVFilterTransactions}
            options={options}
          />
          <Code
            configuration={configuration}
            filter={filter}
            options={options}
            showCode={showCode}
            displayValue="RailzTransactionsControl"
          />
        </div>
      )}
      {[RVReportTypes.FINANCIAL_RATIO].includes(filter.reportType) && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">Using Railz FinancialRatios Component</h4>
          <p>
            Railz Financial Ratios Component only accepts <b>financialRatios</b>
          </p>
          <RailzFinancialRatios
            configuration={configuration}
            filter={filter as RVFilterFinancialRatio}
            options={options}
          />
          <Code
            configuration={configuration}
            filter={filter}
            options={options}
            showCode={showCode}
            displayValue="RailzFinancialRatios"
          />
        </div>
      )}
      {![
        RVReportTypes.RAILZ_SCORE,
        RVReportTypes.EXPENSES,
        RVReportTypes.REVENUE,
        RVReportTypes.BALANCE_SHEET,
        RVReportTypes.CASHFLOW_STATEMENTS,
        RVReportTypes.INCOME_STATEMENTS,
        RVReportTypes.BILLS,
        RVReportTypes.INVOICES,
        RVReportTypes.FINANCIAL_RATIO,
        'all',
      ].includes(filter.reportType) && (
        <DefaultComponent
          configuration={configuration}
          filter={filter}
          options={options}
          showCode={showCode}
        />
      )}
    </div>
  );
};
export default function Visualizations({ configuration, filter, options }: ChartProps) {
  const [code, setCode] = useState(false);
  return (
    <div className="md:grid md:grid-cols-1 md:gap-1 text-left">
      <div className="col-span-1 flex justify-end">
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
      <Components configuration={configuration} filter={filter} options={options} showCode={code} />
    </div>
  );
}
