import React from 'react';
import Header from '../../components/header';
import { RVReportTypes } from '@railzai/railz-visualizations';
import {
  RailzErrorImage,
  RailzLoading,
  RailzProgressBar,
} from '@railzai/railz-visualizations-react';

const AllComponents = () => {
  return (
    <div className="text-left px-2">
      <h2 className="text-3xl font-bold text-gray-900">Railz Error Component</h2>
      <div className="md:grid md:grid-cols-4 md:gap-6 mt-6">
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>202 Status Response - Represents Sync In progress</p>
          <div className="shadow p-4 mt-2 flex h-full">
            <RailzErrorImage statusCode={202} />
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>204 & 404 Status Response - Represents No Content with removed text</p>
          <div className="shadow p-4 mt-2 flex h-full">
            <RailzErrorImage statusCode={204} />
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>Other Codes - Represents Any other status code with color(Customization)</p>
          <div className="shadow p-4 mt-2 flex h-full">
            <RailzErrorImage
              statusCode={500}
              fillColor={'#910303'}
              textStyle={{ color: '#910303', fontSize: '18px', fontWeight: 600 }}
              width="150px"
              height="150px"
            />
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>204 Response - with removed text</p>
          <div className="shadow p-4 mt-2 flex h-full">
            <RailzErrorImage statusCode={204} />
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mt-10">Railz Loading Component</h2>
      <div className="md:grid md:grid-cols-3 md:gap-6 mt-6">
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>Loading Indicator Only - No Text</p>
          <div className="shadow p-4 mt-2 flex items-center h-full">
            <RailzLoading />
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>Loading Indicator with text</p>
          <div className="shadow p-4 mt-2 flex items-center h-full">
            <RailzLoading loadingText="Loading Data" />
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>Loading Indicator with text(Customization)</p>
          <div className="shadow p-4 mt-2 flex items-center h-full">
            <RailzLoading
              loadingText="Loading Data"
              fillColor={'#000000'}
              textStyle={{ color: '#00884f', fontSize: '18px', fontWeight: 400 }}
              width="150px"
              height="150px"
            />
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mt-10">Railz Progress Bar Component</h2>
      <div className="md:grid md:grid-cols-2 md:gap-6 mt-6">
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>Invoices - No Parameter</p>
          <div className="shadow p-4 mt-2 flex items-center h-full">
            <RailzProgressBar reportType={RVReportTypes.INVOICES} />
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>Bills - Overdue Parameter</p>
          <div className="shadow p-4 mt-2 flex items-center h-full">
            <RailzProgressBar reportType={RVReportTypes.BILLS} overdueAmount={2000} />
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>Invoices - No Paid Data</p>
          <div className="shadow p-4 mt-2 flex items-center h-full">
            <RailzProgressBar
              reportType={RVReportTypes.INVOICES}
              unpaidAmount={15000}
              paidAmount={0}
              overdueAmount={2000}
            />
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>Bills - No Paid Data(Bar color customization)</p>
          <div className="shadow p-4 mt-2 flex items-center h-full">
            <RailzProgressBar
              reportType={RVReportTypes.BILLS}
              unpaidAmount={13000}
              paidAmount={0}
              overdueAmount={5000}
              options={{
                barStyle: {
                  background: '#a6d2ac',
                },
              }}
            />
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>Invoices - Partial Payment</p>
          <div className="shadow p-4 mt-2 flex items-center h-full">
            <RailzProgressBar
              reportType={RVReportTypes.INVOICES}
              unpaidAmount={12000}
              paidAmount={15000}
              overdueAmount={2000}
            />
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
          <p>Bills - Paid in full(Bar color customization)</p>
          <div className="shadow p-4 mt-2 flex items-center h-full">
            <RailzProgressBar
              reportType={RVReportTypes.BILLS}
              unpaidAmount={0}
              paidAmount={15000}
              overdueAmount={0}
              options={{
                progressStyle: {
                  background: '#2e6521',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default function Others() {
  return (
    <div className="App">
      <Header description={'This page shows you other reusable components provided the SDK.'}>
        <AllComponents />
      </Header>
    </div>
  );
}
