export interface Card {
  id: string
  brand: 'Visa' | 'MasterCard'
  exp_month: number
  exp_year: number
  last4: string
}
