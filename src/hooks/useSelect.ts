import { SetStateAction, useState } from 'react';

function useSelect(value: any) {
  const [selectValue, setSelectValue] = useState(value);

  const handleSelect = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectValue(e.target.value);
  };

  return [selectValue, handleSelect];
}

export default useSelect;
