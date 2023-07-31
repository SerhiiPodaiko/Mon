export interface Invoices {
  items: Invoice[]
  total: number
  summary: {
    total_items: number
    total_rights_holders: number
    total_quantity_count: number
    total_price: number
    total_fee: number
    total_subtotal: number
  }
}

export enum InvoiceStatus {
  'CANCELLED' = 'Reject',
  'PAYMENT_COMPLETED' = 'In process',
  'PARTIAL_PAYMENT' = 'In process',
  'PAYMENT_PENDING' = 'Request sent'
}

export interface Invoice {
  invoice: {
    invoice_id: string
    updated: string
    product_id: string
    fee_const: number
    subtotal: number
    invoice_status: 'CANCELLED' | 'PAYMENT_COMPLETED' | 'PARTIAL_PAYMENT'
    created: string
    brand_repr_sub: string
    quantity: number
    fee: number
    payment_id: string | null
    brand_repr: {
      email: string
      first_name: string
      date_of_birth: string
      phone_code: string
      location: string
      date_created: string
      nationality: string
      sub: string
      last_name: string
      phone_number: string
      role: string
      file_name: string
      account_status: string
      brand_sub: string
      brand: {
        email: string
        official_name: string
        contact_last_name: string
        phone_code: string
        sector: string
        logo_file_name: string
        account_status: string
        stripe_id: string | null
        sub: string
        contact_first_name: string
        phone_number: string
        website: string
        background_file_name: string
        date_created: string
        description: string
      }
    }
  }
  product: {
    product_rights_holder_sub: string
    created: string
    product_comment: string
    product_price: number
    product_show: boolean
    updated: string
    product_id: string
    product_category_id: string
    product_duration: null
    product_available_count: number
  }
  product_category: {
    product_category_icon: string | null
    product_category_picture: string
    product_category_icon_link: string | null
    product_category_picture_link: string
  }
  brand: {
    email: string
    official_name: string
    contact_last_name: string
    phone_code: string
    sector: string
    logo_file_name: string
    account_status: string
    stripe_id: string | null
    sub: string
    contact_first_name: string
    phone_number: string
    website: string
    background_file_name: string
    date_created: string
    description: string
  }
  right_holder: {
    first_name: string
    country: {
      country_code: string
    }
    last_name: string
    date_of_birth: string
    address: string
    nationality: string
    qualification: string
    kind_of_sport_pk: string
    country_name: string
    file_name: string
    email: string
    link: string
    kind_of_sport: {
      name: string
      sport_type: string
      pk: string
    }
    rights_holder_sub: string
  }
}
