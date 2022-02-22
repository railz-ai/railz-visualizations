/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import {CalendarIcon, TagIcon} from '@heroicons/react/solid';
import {NavLink} from 'react-router-dom';
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
    { name: 'Basic', href: '/'},
    { name: 'Customization', href: '/customization' },
    { name: 'Other Components', href: '/others' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface HeaderProps {
    children: React.ReactElement;
    description: string;
}

export default function Header({children, description}: HeaderProps) {
    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8"
                                                src="https://pbs.twimg.com/profile_images/1325486360682180614/p8pwyjLY_400x400.png"
                                                alt="Railz Logo"
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <NavLink
                                                        key={item.name}
                                                        to={item.href}
                                                        className={({ isActive }) => classNames(isActive ? 'bg-gray-900 text-white hover:bg-gray-800' : 'text-gray-300 hover:bg-gray-800 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')}
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    {navigation.map((item) => (

                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            className={({ isActive }) => classNames(isActive ? 'bg-gray-900 text-white hover:bg-gray-800' : 'text-gray-300 hover:bg-gray-800 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium')}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-left">
                        <h1 className="text-3xl font-bold text-gray-900">Sample Dashboard</h1>
                        <p className="mt-1 text-md text-gray-600">This is a quickstart example of a React application that consumes the Railz Visualizations SDK. {description}</p>
                        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                Updated on February 11, 2022
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <TagIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                Version 0.20
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}
