import { SetStateAction, useState } from 'react';

function useInput(value: any) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    if (e.target) setInputValue(e.target.value);
    else setInputValue('');
  };

  return [inputValue, handleChange];
}

export default useInput;
