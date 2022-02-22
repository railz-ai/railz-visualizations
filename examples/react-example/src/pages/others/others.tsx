import React from "react";
import Header from "../../components/header";
import {RailzErrorImage, RailzLoading, RailzProgressBar} from "@railzai/railz-visualizations-react";

const AllComponents = () => {
    return (
        <div className="text-left">
            <h2 className="text-3xl font-bold text-gray-900">Railz Error Component</h2>
            <div className="md:grid md:grid-cols-3 md:gap-6 mt-6">
                <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
                    <p>202 Status Response - Represents Sync In progress</p>
                    <div className="shadow p-4 mt-2 flex h-full">
                        <RailzErrorImage statusCode={202}/>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
                    <p>204 Status Response - Represents No Content</p>
                    <div className="shadow p-4 mt-2 flex h-full">
                        <RailzErrorImage statusCode={204}/>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-1 flex flex-col">
                    <p>Other Codes - Represents Any other status code</p>
                    <div className="shadow p-4 mt-2 flex h-full">
                        <RailzErrorImage statusCode={500}/>
                    </div>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mt-10">Railz Loading Component</h2>
            <div className="grid grid-cols-2 gap-4 mx-auto mt-6">
                <div className="col-span-1 flex flex-col">
                    <p>Loading Indicator Only - No Text</p>
                    <div className="shadow p-4 mt-2 flex items-center h-full">
                        <RailzLoading/>
                    </div>
                </div>
                <div className="col-span-1 flex flex-col">
                    <p>Loading Indicator with text</p>
                    <div className="shadow p-4 mt-2 flex items-center h-full">
                        <RailzLoading loadingText="Loading Data"/>
                    </div>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mt-10">Railz Progress Bar Component</h2>
            <div className="grid grid-cols-2 gap-4 mx-auto mt-6">
                <div className="col-span-1 flex flex-col">
                    <p>Invoices - No Parameter</p>
                    <div className="shadow p-4 mt-2 flex items-center h-full">
                        <RailzProgressBar reportType="invoices"/>
                    </div>
                </div>
                <div className="mt-3 col-span-1 flex flex-col">
                    <p>Bills - Overdue Parameter</p>
                    <div className="shadow p-4 mt-2 flex items-center h-full">
                        <RailzProgressBar reportType="bills" overdueAmount={2000}/>
                    </div>
                </div>
                <div className="col-span-1 flex flex-col">
                    <p>Invoices - No Paid Data</p>
                    <div className="shadow p-4 mt-2 flex items-center h-full">
                        <RailzProgressBar reportType="invoices" unpaidAmount={15000} paidAmount={0} overdueAmount={2000}/>
                    </div>
                </div>
                <div className="mt-3 col-span-1 flex flex-col">
                    <p>Bills - No Paid Data</p>
                    <div className="shadow p-4 mt-2 flex items-center h-full">
                        <RailzProgressBar reportType="bills" unpaidAmount={13000} paidAmount={0} overdueAmount={5000}/>
                    </div>
                </div>
                <div className="col-span-1 flex flex-col">
                    <p>Invoices - Partial Payment</p>
                    <div className="shadow p-4 mt-2 flex items-center h-full">
                        <RailzProgressBar reportType="invoices" unpaidAmount={12000} paidAmount={15000} overdueAmount={2000}/>
                    </div>
                </div>
                <div className="mt-3 col-span-1 flex flex-col">
                    <p>Bills - Paid in full</p>
                    <div className="shadow p-4 mt-2 flex items-center h-full">
                        <RailzProgressBar reportType="bills" unpaidAmount={0} paidAmount={15000} overdueAmount={0}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default function Others() {

    return (
        <div className="App">
            <Header description={'This page shows you other reusable components provided the SDK.'} children={<AllComponents/>}/>
        </div>
    );
}