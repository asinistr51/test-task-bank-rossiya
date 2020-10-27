import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles/CalculatorPref.css';

import { DepositsList, DepositItem, FormState } from '../interfaces/interfaces';
import useFormController from '../utils/useFormController';
import { calculator} from '../utils/calculator';
import { ModalWindow } from './ModalWindow';
import { findIndexInDepositsList, findIndexInDepositsParams } from '../utils/findIndexInDepositsList';

interface CalculatorPrefProps {
  properties: DepositsList;
}

export const CalculatorPref: React.FC<CalculatorPrefProps> = ({
  properties,
}: CalculatorPrefProps): React.ReactElement => {
  const [formValues, setFormValues] = useFormController({
    code: '',
    period: '',
    summ: '',
  });
  const [depositOffer, setDepositOffer] = React.useState<
    FormState | undefined
  >();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [codeIndex, setCodeIndex] = React.useState<number>(NaN);
  const [periodIndex, setPeriodIndex] = React.useState<number>(NaN);
  React.useEffect(() => {
    if (formValues.code){
      setCodeIndex(findIndexInDepositsList(properties, formValues.code));
    } else {
      setCodeIndex(NaN)
    }

  }, [formValues.code, properties, formValues]);

  React.useEffect(() => {
      setPeriodIndex(findIndexInDepositsParams(properties, formValues.period, formValues.code));

  }, [formValues.period, properties, formValues]);

  const handleClickOpenModal = React.useCallback((): void => {
    setVisible(true);
  }, [setVisible])

  const handleClickCloseModal = React.useCallback((): void => {
    setVisible(false);
  }, [setVisible])

  const handleClickButton = React.useCallback(() => {
    setDepositOffer(calculator(formValues, properties));
    handleClickOpenModal();
  }, [handleClickOpenModal, formValues, properties])

  return (
    <>
      <FormControl className="input-section" variant="outlined">
        <InputLabel>Тип депозита</InputLabel>
        <Select
          labelId="outlined-basic"
          id="outlined-basic"
          name="code"
          value={formValues.code}
          label="Тип"
          onChange={setFormValues}
        >
          <MenuItem value="">
            <em>Не выбран</em>
          </MenuItem>
          {properties.deposits.map((el: DepositItem, index) => (
            <MenuItem key={index} value={el.code}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className="input-section"
        name="period"
        type="number"
        error={!formValues.code }
        helperText={formValues.code ? `Минимальный срок: ${properties.deposits[codeIndex]?.param[0].period_from } дней`: 'Выберите тип'}
        disabled={!formValues.code}
        label="Срок"
        variant="outlined"
        value={formValues.period}
        onChange={setFormValues}
      />
      <TextField
        className="input-section"
        name="summ"
        type="number"
        label="Сумма"
        disabled={isNaN(codeIndex) && !properties.deposits[codeIndex]?.param[periodIndex]?.summs_and_rate[0] ? true : +formValues.period < properties.deposits[codeIndex]?.param[0].period_from}
        error={isNaN(periodIndex) || !properties.deposits[codeIndex]?.param[periodIndex]?.summs_and_rate[0] ? true :+formValues.summ < properties.deposits[codeIndex]?.param[periodIndex]?.summs_and_rate[0].summ_from}
        helperText={formValues.period && properties.deposits[codeIndex]?.param[periodIndex]?.summs_and_rate[0] ? `Минимальная сумма: ${properties.deposits[codeIndex]?.param[periodIndex]?.summs_and_rate[0].summ_from}` : `Укажите срок`}
        variant="outlined"
        value={formValues.summ}
        onChange={setFormValues}
      />
      <Button
        className="input-section"
        onClick={handleClickButton}
        variant="contained"
        color="primary"
        disabled={isNaN(periodIndex) ? true :+formValues.summ < properties.deposits[codeIndex]?.param[periodIndex]?.summs_and_rate[0].summ_from}
      >
        Рассчитать вклад
      </Button>
      <ModalWindow
        visible={visible}
        onClose={handleClickCloseModal}
        offer={depositOffer}
        depositName={
          properties?.deposits?.find(
            (deposit) => deposit.code === formValues.code
          )?.name
        }
      />
    </>
  );
};