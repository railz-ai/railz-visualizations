import React, { useState } from 'react';
import { OptionFormProps } from '../../../types/form';
import ReactJson from 'react-json-view';
export default function OptionsForm({ options, setOptions }: OptionFormProps) {
  const [formOptions, setFormOptions] = useState(options || {});

  const submitOptions = (event: any) => {
    setFormOptions(event.updated_src);
    setOptions && setOptions(event.updated_src);
  };

  return (
    <div className="flex flex-col">
      <div className="md:col-span-1">
        <div className="text-left">
          <h2 className="text-lg font-medium leading-6 text-gray-900">Options</h2>
          <p className="mt-1 text-sm text-gray-600">
            Optional parameters for the SDK, they cannot be dynamically changed and should be set
            before clicking on the filter submit button. They are for customization of content and
            styles
          </p>
        </div>
      </div>
      <div className="mt-2 md:mt-2 md:col-span-2 text-left">
        {setOptions && (
          <ReactJson
            src={formOptions}
            onEdit={submitOptions}
            onAdd={submitOptions}
            collapsed={true}
          />
        )}
      </div>
    </div>
  );
}
