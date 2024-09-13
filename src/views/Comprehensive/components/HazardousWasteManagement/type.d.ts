export interface InfoItem {
  name: string | null
  key: string | null
  icon: string | null
}
export interface InfoData {
  wasteGenerated: number | string | null
  selfUse: number | string | null
  transfer: number | string | null
  stockWeight: number | string | null
}

export interface Props {
  companyCode?: string | number
  companyAuth?: string | number
  year?: string | number
}
