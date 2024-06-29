import React from 'react';

type EmailType = {
  regex: RegExp,
  message: string,
};

type TipoType = {
  regex: RegExp,
  message: string,
};

const tipos: Record<string, EmailType | TipoType> = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido',
  },

  tipo: {
    regex: /^[ES]$/,
    message: 'Valido somente "E" ou "S" ',
  },
};

const useForm = (type?: any) => {
  const [value, setValue] = React.useState<any>('');
  const [error, setError] = React.useState<string>('');

  function validate(value: any) {

    if (type === false) return true;

    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;

    } else if ((tipos[type]) && (!tipos[type].regex.test(value))) {
      setError(tipos[type].message);
      return false;
    } else {
      setError('');
      return true;
    }

  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) validate(event.target.value);
    setValue(event.target.value);
    console.log(event.target.value)
  }
  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;