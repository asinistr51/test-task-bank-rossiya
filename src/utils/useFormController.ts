import React from 'react';
import { FormState, MUISelect } from '../interfaces/interfaces';

const useFormController: Function = (state: FormState): [FormState, (event: React.ChangeEvent<HTMLInputElement | MUISelect>) => void] => {
  const [embedState, setEmbedState] = React.useState<FormState>(state);

  const changeFormState = (
    event: React.ChangeEvent<HTMLInputElement | MUISelect>
  ): void => {
    const name: string = event.target.name as string
    const value: string = event.target.value as string
    setEmbedState(prevState => ({...prevState, [name]: value}))
  };
  return [embedState, changeFormState]
};

export default useFormController