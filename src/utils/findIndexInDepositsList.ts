import {DepositsList, DepositItem} from '../interfaces/interfaces'
import {defineRange} from './calculator'
export const findIndexInDepositsList: Function = (list: DepositsList, code: string) => {
  if (code) {
    const index = list.deposits?.findIndex((deposit: DepositItem) => deposit.code === code)
    return index
  }
  return NaN
}

export const findIndexInDepositsParams: Function = (list: DepositsList, period: string, code: string) => {
  if (period) {
    const index = list.deposits?.findIndex((deposit: DepositItem) => deposit.code === code)
    const paramList = list.deposits[index].param.map(value => value.period_from)
    const periodIndex = defineRange(period, paramList)
    return periodIndex
  }
  return NaN
}
