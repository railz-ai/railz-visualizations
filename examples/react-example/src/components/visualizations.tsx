import React from 'react';
import {RVConfiguration, RVFilter, RVOptions, RVReportFrequency, RVReportTypes, RVServiceProviders} from "@railzai/railz-visualizations";
import {RailzVisualizations} from "@railzai/railz-visualizations-react";

type AllTypes = 'all' & RVReportTypes.INVOICES;

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
    options?: RVOptions;
}

export default function Visualizations({token, filter, options}: ChartProps) {
    return (<div className="md:grid md:grid-cols-1 md:gap-1">
        {filter.reportType === 'all' ? Object.values(RVReportTypes).map((reportType) => <div className="col-span-1"><RailzVisualizations
                configuration={token} filter={{...filter, reportType} as RVFilter} options={options}/></div>) :
            <RailzVisualizations configuration={token} filter={filter as RVFilter} options={options}/>}
    </div>)
}