import React from 'react'

interface InputProps {
  name: string | "";
  type: string | "";
  value: string | "";
  label: string | "";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
};

const Input: React.FC<InputProps> = ({ name, type, value, label, onChange, error, onBlur }) => {

  return (
    <div className='space-y-2 min-w-32 w-full' >
      <label className='block text-sm font-medium text-gray-800'>
        {label}
      </label>

      <input
        className=' bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-red-500'
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div>
      {error != "" ? <p className='text-red-500 text-xs' > {error} </p> : <p className='opacity-0 text-xs'>s</p> }
      </div>

    </div>
  );
};

export default Input