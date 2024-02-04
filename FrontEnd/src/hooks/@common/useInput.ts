import { useState, ChangeEvent } from 'react';

function useInput<T>(initalValue: T): [T, (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void] {
  const [values, setValues] = useState<T>(initalValue);

  const changer = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  return [values, changer];
}

export default useInput;
