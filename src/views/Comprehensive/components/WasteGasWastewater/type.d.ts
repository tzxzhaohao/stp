export interface Item {
  factorCode: number | string
  factorName: number | string
  factorValue: number | string
  targetValue: number | string
  percent: number | string
  exceed: boolean
}

export interface Tab {
  name: string
  id: string
}

export interface DischargeItem {
  name: string
  factorList?: Item[]
}
