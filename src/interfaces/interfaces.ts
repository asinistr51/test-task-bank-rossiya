export interface DepositsList {
  deposits: DepositItem[];
}

export interface DepositItem {
  code: string;
  name: string;
  param: DepositItemParams[];
}

export interface DepositItemParams {
  period_from: number;
  summs_and_rate: DepositItemParamsSummsAndRate[];
}

export interface DepositItemParamsSummsAndRate {
  summ_from: number;
  rate: number;
}

export interface FormState {
  code: string;
  summ: string;
  period: string;
  rate?: number;
  profit?: number
}

export interface MUISelect {
  name?: string | undefined;
  value: unknown;
}
