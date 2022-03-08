import React, { useState } from "react";
import { ContentFormProps } from "../../../types/form";

export default function ContentForm({ setContent }: ContentFormProps) {
  const [formContent, setFormContent] = useState<any>({
    title: "",
    dateMonth: "MMM yyyy",
    dateQuarter: "Q",
    labelDate: "As of",
  });

  const submitCustomization = (event: any) => {
    event.preventDefault();
    setContent && setContent(formContent);
  };

  const handleContentChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormContent({ ...formContent, [name]: value });
  };

  return (
    <div className="flex flex-col">
      <div className="md:col-span-1">
        <div className="text-left">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Customization
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Customize here params you can send to the SDK.
          </p>
        </div>
      </div>
      <div className="mt-2 md:mt-2 md:col-span-2 text-left">
        <form onSubmit={submitCustomization} method="POST">
          <div className="overflow-hidden sm:rounded-md bg-white">
            <div className="grid grid-cols-6 gap-6 items-end">
              <div className="col-span-6 lg:col-span-6">
                <hr />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  onChange={handleContentChange}
                  value={formContent.title}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Title"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="date-month"
                  className="block text-sm font-medium text-gray-700"
                >
                  Month Format
                </label>
                <input
                  id="date-month"
                  type="text"
                  name="dateMonth"
                  onChange={handleContentChange}
                  value={formContent.dateMonth}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="MMM yyyy"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="date-quarter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quarter Text
                </label>
                <input
                  id="date-quarter"
                  type="text"
                  name="dateQuarter"
                  onChange={handleContentChange}
                  value={formContent.dateQuarter}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Q"
                />
              </div>
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="label-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  id="label-date"
                  type="text"
                  name="labelDate"
                  onChange={handleContentChange}
                  value={formContent.labelDate}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="As of"
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
  );
}
