import React, { useState } from 'react';
import {
  RVConfiguration,
  RVOptions,
  RVReportFrequency,
  RVReportTypes,
  RVServiceProviders,
  RVFilterFinancialRatio,
  RVFilterIncomeStatementsType,
  RVFilterStatements,
  RVFilterTransactions,
  RVFilterAll,
  RVFilterBankAccount,
  RVFilterCreditScore,
  RVFilterBankReconciliation,
  RVFilterBusinessValuations,
} from '@railzai/railz-visualizations';
import {
  RailzBankAccounts,
  RailzFinancialRatios,
  RailzCreditScore,
  RailzIncomeStatements,
  RailzStatementsChart,
  RailzTransactionsControl,
  RailzVisualizations,
  RailzBusinessValuations,
} from '@railzai/railz-visualizations-react';
import { cloneDeep, isEmpty, pick } from 'lodash';
import { RailzBankReconciliation } from '@railzai/railz-visualizations-react';

type AllTypes = 'all' & RVReportTypes;

interface Filter {
  businessName?: string;
  serviceName?: RVServiceProviders;
  connectionUuid?: string;
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
    allParameters = pick(filter, ['startDate', 'endDate', 'reportType', 'connectionUuid']);
  } else {
    allParameters = pick(filter, [
      'startDate',
      'endDate',
      'reportFrequency',
      'reportType',
      'connectionUuid',
    ]);
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
          RVReportTypes.CREDIT_SCORE,
          RVReportTypes.FINANCIAL_RATIO,
          RVReportTypes.BANK_ACCOUNT,
          RVReportTypes.BANK_RECONCILIATION,
          RVReportTypes.BUSINESS_VALUATIONS,
          RVReportTypes.TAX_BENCHMARKING,
        ].map((reportType, index) => {
          const cloneOptions = cloneDeep(options);
          if (index !== 0) {
            delete cloneOptions?.content?.title;
          }
          return (
            <div className="col-span-1 mt-1" key={reportType}>
              <DefaultComponent
                configuration={configuration}
                filter={cloneDeep({ ...filter, reportType }) as Filter}
                options={cloneOptions}
                showCode={showCode}
              />
              <DefaultComponent
                configuration={configuration}
                filter={
                  cloneDeep({ ...filter, reportType: RVReportTypes.TAX_BENCHMARKING }) as Filter
                }
                options={cloneOptions}
                showCode={showCode}
              />
            </div>
          );
        })}
      {[RVReportTypes.CREDIT_SCORE].includes(filter.reportType) && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">Using Credit Score Component</h4>
          <p>
            Credit Score Component only accepts <b>creditScore</b>
          </p>
          <RailzCreditScore
            configuration={configuration}
            filter={filter as RVFilterCreditScore}
            options={options}
          />
          <Code
            configuration={configuration}
            filter={filter}
            options={options}
            showCode={showCode}
            displayValue="RailzCreditScore"
          />
        </div>
      )}
      {filter.reportType === RVReportTypes.EXPENSES && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">Using Pie Chart Component</h4>
          <p>
            Pie Chart Component only accepts <b>expenses</b> and <b>revenues</b>
          </p>
          <RailzIncomeStatements
            configuration={configuration}
            filter={filter as RVFilterIncomeStatementsType}
            options={options}
          />
          <Code
            configuration={configuration}
            filter={filter}
            options={options}
            showCode={showCode}
            displayValue="RailzIncomeStatements"
          />
        </div>
      )}
      {filter.reportType === RVReportTypes.BALANCE_SHEET && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">Using Statements Chart Component</h4>
          <p>
            Statements Chart Component only accepts <b>balanceSheets</b>, <b>cashflowStatements</b>{' '}
            and <b>incomeStatements</b>
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
      {filter.reportType === RVReportTypes.BILLS && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">Using Transactions Control Component</h4>
          <p>
            Transactions Control Component only accepts <b>bills</b> and <b>invoices</b>
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
          <h4 className="text-xl font-bold text-gray-900">Using FinancialRatios Component</h4>
          <p>
            Financial Ratios Component only accepts <b>financialRatios</b>
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
      {filter.reportType === RVReportTypes.BANK_ACCOUNT && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">Using Bank Accounts Component</h4>
          <p>
            Bank Accounts Component only accepts <b>bankAccounts</b>
          </p>
          <RailzBankAccounts
            configuration={configuration}
            filter={filter as RVFilterBankAccount}
            options={options}
          />
          <Code
            configuration={configuration}
            filter={filter}
            options={options}
            showCode={showCode}
            displayValue="RailzBankAccounts"
          />
        </div>
      )}
      {filter.reportType === RVReportTypes.BANK_RECONCILIATION && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">Using Bank Reconciliation Component</h4>
          <p>
            Bank Reconciliation Component only accepts <b>bankReconciliation</b>
          </p>
          <RailzBankReconciliation
            configuration={configuration}
            filter={filter as RVFilterBankReconciliation}
            options={options}
          />
          <Code
            configuration={configuration}
            filter={filter}
            options={options}
            showCode={showCode}
            displayValue="RailzReconciliation"
          />
        </div>
      )}
      {filter.reportType === RVReportTypes.BUSINESS_VALUATIONS && (
        <div>
          <h4 className="text-xl font-bold text-gray-900">Using Business Valuations Component</h4>
          <p>
            Bank Reconciliation Component only accepts <b>businessValuations</b>
          </p>
          <RailzBusinessValuations
            configuration={configuration}
            filter={filter as RVFilterBusinessValuations}
            options={options}
          />
          <Code
            configuration={configuration}
            filter={filter}
            options={options}
            showCode={showCode}
            displayValue="RailzBusinessValuations"
          />
        </div>
      )}
      {![
        RVReportTypes.CREDIT_SCORE,
        RVReportTypes.EXPENSES,
        RVReportTypes.BALANCE_SHEET,
        RVReportTypes.BILLS,
        RVReportTypes.FINANCIAL_RATIO,
        RVReportTypes.BANK_ACCOUNT,
        RVReportTypes.BANK_RECONCILIATION,
        RVReportTypes.BUSINESS_VALUATIONS,
        RVReportTypes.TAX_BENCHMARKING,
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
