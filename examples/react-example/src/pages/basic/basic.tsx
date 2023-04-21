import Header from '../../components/header';
import Form from '../../components/form/form';
import Visualizations from '../../components/visualizations';
import React, { useState } from 'react';
import { AuthenticationParameters } from '../../types/authentication';
import { isEmpty } from 'lodash';

export default function Basic() {
  const [token, setToken] = useState('');
  const [filter, setFilter] = useState({});
  const [error, setError] = useState('');

  const submitAuthentication = async (params: AuthenticationParameters): Promise<void> => {
    setError('');
    const response = await fetch(params.authUrl, { method: 'GET' });
    if (!response.ok) {
      setError('Could not retrieve auth configuration');
      return;
    }
    const result = await response.json();
    setToken(result.access_token);
  };

  const submitFilter = (filter: any) => {
    setFilter(filter);
    setError('');
    if (!token) {
      setError('Token required before filter can be triggered.');
    }
  };

  return (
    <div className="App">
      <Header description={'This page shows you the default stylings and colors used by the SDK.'}>
        <div className="md:grid md:grid-cols-3 md:gap-6 px-1">
          <div className="md:col-span-1 shadow p-4">
            <Form
              setFilter={submitFilter}
              setAuthentication={submitAuthentication}
              setError={setError}
            />
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 px-1">
            {!token && 'No Token, submit your authentication details'}
            {token && isEmpty(filter) && 'No Filter, submit your filter details'}
            {token && !isEmpty(filter) && (
              <Visualizations
                configuration={{
                  token,
                  debug: true,
                  endpoint: 'https://api.qa2.railz.ai',
                }}
                filter={filter as any}
              />
            )}

            {error && <p className="mt-5 md:mt-0 md:col-span-2 text-red-700">{error}</p>}
          </div>
        </div>
      </Header>
    </div>
  );
}
