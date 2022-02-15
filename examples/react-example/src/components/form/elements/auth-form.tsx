import React, {useState} from 'react';
import {AuthenticationParameters} from "../../../types/authentication";
import {FormProps} from "../../../types/form";


export default function AuthForm({ setAuthentication, setError}: FormProps) {
    const [formAuth, setFormAuth] = useState<AuthenticationParameters>({apiUrl: '', clientId: '', clientSecret: ''});

    const submitAuth = async (event: any) => {
        event.preventDefault();
        if(formAuth.apiUrl && formAuth.clientId && formAuth.clientSecret) {
            await setAuthentication(formAuth);
        } else {
            setError('Authentication details are required to get access token.')
        }
    }

    const handleAuthChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setFormAuth({...formAuth, [name]: value});
    }

    return (
        <div className="flex flex-col">
            <div className="md:col-span-1">
                <div className="text-left">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">Authentication</h2>
                    <p className="mt-1 text-sm text-gray-600">Include your Railz authentication details <a href="https://docs.railz.ai/reference/authentication" target="_blank" className="underline">here</a>.</p>
                    <p className="mt-1 text-sm text-gray-600 font-bold">This is not implemented by the SDK.</p>
                </div>
            </div>
            <div className="mt-4 md:mt-2 md:col-span-2 text-left items-end">
                <form onSubmit={submitAuth} method="POST">
                    <div className="overflow-hidden sm:rounded-md bg-white">
                        <div className="grid grid-cols-6 gap-6 items-end">
                            <div className="col-span-6 lg:col-span-6">
                                <label htmlFor="api-url" className="block text-sm font-medium text-gray-700">
                                    Auth Url
                                </label>
                                <input
                                    type="text"
                                    name="apiUrl"
                                    id="api-url"
                                    required
                                    placeholder="https://auth.railz.ai/getAccess"
                                    onChange={handleAuthChange}
                                    value={formAuth.apiUrl}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-6 lg:col-span-6">
                                <label htmlFor="client-id" className="block text-sm font-medium text-gray-700">
                                    Client Id
                                </label>
                                <input
                                    type="text"
                                    name="clientId"
                                    id="client-id"
                                    required
                                    onChange={handleAuthChange}
                                    value={formAuth.clientId}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-6 lg:col-span-6">
                                <label htmlFor="client-secret" className="block text-sm font-medium text-gray-700">
                                    Client Secret
                                </label>
                                <input
                                    type="text"
                                    name="clientSecret"
                                    id="client-secret"
                                    required
                                    onChange={handleAuthChange}
                                    value={formAuth.clientSecret}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-6 lg:col-span-6 items-end">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center w-full place-items-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
