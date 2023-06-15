import React, { useState } from 'react';

import { AuthFormProps } from '../../../types/form';

export default function AuthForm({ setError, setToken }: AuthFormProps) {
  const [formAccessToken, setFormAccessToken] = useState('');

  const submitToken = async (event: any) => {
    event.preventDefault();
    if (formAccessToken) {
      setToken(formAccessToken);
    } else {
      if (setError) {
        setError('Authentication details are required to get access configuration.');
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="text-left">
        <h2 className="text-lg font-medium leading-6 text-gray-900">Authentication</h2>
        <p className="mt-1 text-sm text-gray-600">
          Set your access token here to load visualizations.
        </p>
      </div>
      <div className="mt-4 md:mt-4 text-left items-end">
        <form onSubmit={submitToken} method="POST">
          <div className="overflow-hidden sm:rounded-md bg-white">
            <div className="grid grid-cols-6 gap-6 items-end">
              <div className="col-span-6 lg:col-span-6">
                <label htmlFor="api-url" className="block text-sm font-medium text-gray-700">
                  Access Token
                </label>
                <input
                  type="text"
                  name="authUrl"
                  id="api-url"
                  required
                  placeholder="example_acces_token"
                  onChange={(e) => setFormAccessToken(e.target.value)}
                  value={formAccessToken}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 lg:col-span-6 items-end">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full place-items-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                >
                  Set Access Token
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
