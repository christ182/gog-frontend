import { useState } from 'react';

const useForm = (callback, state) => {
  const [values, setValues] = useState(state);
  const handleChange = event => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    callback(e, values);
  };

  const resetValues = () => {
    setValues(state);
  };

  return {
    handleChange,
    handleSubmit,
    resetValues,
    values,
  };
};

export default useForm;
