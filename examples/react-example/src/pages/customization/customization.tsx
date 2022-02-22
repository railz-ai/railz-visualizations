import React, {useState} from "react";
import Header from "../../components/header";
import Form from "../../components/form/form";
import Visualizations from "../../components/visualizations";
import {RVFilter} from "@railzai/railz-visualizations";
import {AuthenticationParameters} from "../../types/authentication";
import {isEmpty} from "lodash";

export default function Customization() {

    const [token, setToken] = useState('');
    const [filter, setFilter] = useState({});
    const [error, setError] = useState('');

    const submitAuthentication = async (params: AuthenticationParameters): Promise<void> => {
        fetch(params.authUrl, {
            "method": "GET"
        })
            .then((response: any) => {
                setToken(response.access_token);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const submitFilter = (filter: RVFilter) => {
        if(token) {
            setFilter(filter);
        } else {
            setError('Token required before filter can be triggered.');
        }

    }

    return (
        <div className="App">
            <Header description={'This page shows you the customizable options that can be passed to the SDK.'} children={<div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1 shadow p-4">
                    <Form setFilter={submitFilter} setAuthentication={submitAuthentication} setError={setError}/>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    {!token && 'No Token, submit your authentication details' }
                    {token && isEmpty(filter) && 'No Filter, submit your filter details' }
                    {token && !isEmpty(filter) && <Visualizations token={{token}}
                                                                  filter={filter as any}/>}

                    {error && <p className="mt-5 md:mt-0 md:col-span-2 text-red-700">
                        {error}
                    </p>}
                </div>
            </div>}/>
        </div>
    );
}