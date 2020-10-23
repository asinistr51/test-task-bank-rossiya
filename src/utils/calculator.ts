import {
  FormState,
  DepositsList,
  DepositItem,
  DepositItemParams,
  DepositItemParamsSummsAndRate,
} from '../interfaces/interfaces';

export const calculator: Function = (
  formValues: FormState,
  depositsList: DepositsList
) => {
  const depositIndex: number = depositsList.deposits.findIndex(
    (deposit: DepositItem) => deposit.code === formValues.code
  );
  const selectedDeposit: DepositItem = depositsList.deposits[depositIndex];
  const periodsList: number[] = selectedDeposit.param.map(
    (param: DepositItemParams) => param.period_from
  );
  const indexOfRange: number = defineRange(formValues.period, periodsList);
  const depositItemParams: DepositItemParams =
    selectedDeposit.param[indexOfRange];
  const summsList: number[] = depositItemParams.summs_and_rate.map(
    (param: DepositItemParamsSummsAndRate) => param.summ_from
  );
  const indexOfRate: number = defineRange(formValues.summ, summsList);
  const rate: number =
    selectedDeposit.param[indexOfRange].summs_and_rate[indexOfRate].rate;
  const profit: number = Math.round(+formValues.summ * rate * 0.01 * +formValues.period * 100) / 100;
  return {...formValues, rate, profit}
};

export const defineRange: Function = (
  searchingValue: string,
  listOfValues: number[]
): number => {
  const index: number = listOfValues?.findIndex(
    (value: number) => value > +searchingValue
  );
  return index === -1 ? listOfValues.length - 1 : index - 1;
};
