import React, { useState } from 'react';
import { AuthenticationParameters } from '../../../types/authentication';
import { FormProps } from '../../../types/form';

export default function AuthForm({ setAuthentication, setError }: FormProps) {
  const [formAuth, setFormAuth] = useState<AuthenticationParameters>({
    authUrl: '',
  });

  const submitAuth = async (event: any) => {
    event.preventDefault();
    if (formAuth.authUrl) {
      await setAuthentication(formAuth);
    } else {
      setError('Authentication details are required to get access configuration.');
    }
  };

  const handleAuthChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormAuth({ ...formAuth, [name]: value });
  };

  return (
    <div className="flex flex-col">
      <div className="text-left">
        <h2 className="text-lg font-medium leading-6 text-gray-900">Authentication</h2>
        <p className="mt-1 text-sm text-gray-600">
          Include your Authentication server URL here, see our quickstart example{' '}
          <a
            href="https://github.com/railz-ai/railz-visualizations/tree/master/examples/nodejs"
            target="_blank"
            className="underline"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
        <p className="mt-1 text-sm text-gray-600 font-bold">This is not implemented by the SDK.</p>
      </div>
      <div className="mt-4 md:mt-2 text-left items-end">
        <form onSubmit={submitAuth} method="POST">
          <div className="overflow-hidden sm:rounded-md bg-white">
            <div className="grid grid-cols-6 gap-6 items-end">
              <div className="col-span-6 lg:col-span-6">
                <label htmlFor="api-url" className="block text-sm font-medium text-gray-700">
                  Auth Url
                </label>
                <input
                  type="text"
                  name="authUrl"
                  id="api-url"
                  required
                  placeholder="http://localhost:4000/authenticate"
                  onChange={handleAuthChange}
                  value={formAuth.authUrl}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 lg:col-span-6 items-end">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full place-items-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                >
                  Authenticate
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
