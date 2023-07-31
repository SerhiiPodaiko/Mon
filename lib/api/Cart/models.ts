// Invoices
export type DeleteInvoiceCart = {
  invoice_item_product_id: string
}

export type GetInvoiceCart = {
  limit?: number | string
  skip?: number | string
  order_by?: string[]
  where?: {
    or: any
  }
  with_count: boolean
}

export type UpdateInvoiceCart = {
  invoice_item_product_id: string
  invoice_item_quantity: string | number
  invoice_item_replace_quantity: boolean
}

// Campaign

export type CreateCampaignCart = {
  campaign: {
    campaign_name: string
    campaign_description: string
    campaign_start_date: string
    campaign_end_date: string
    campaign_service_reference: string
  }
  items: [
    {
      campaign_item_product_category_id: string
      campaign_item_details: string
      campaign_item_duration: number | string
      campaign_item_post_description: string
      campaign_item_hashtag: string
      campaign_item_link: string
      campaign_item_mention: string
      campaign_item_rules_of_giveaway: string
      campaign_item_datetime: string
      campaign_item_interview: string
      campaign_item_location: string
      campaign_item_terms: string
      files: [
        {
          campaign_item_file_filename: string
          campaign_item_id: string
          base64_file: string
        }
      ]
    }
  ]
}

export type UpdateCampaignCart = {
  campaign?: {
    campaign_name: string
    campaign_description: string
    campaign_start_date: string
    campaign_end_date: string
    campaign_service_reference: string
  }
  campaign_items?: [
    {
      campaign_item_product_category_id: string
      campaign_item_details: string
      campaign_item_duration: number | string
      campaign_item_post_description: string
      campaign_item_hashtag: string
      campaign_item_link: string
      campaign_item_mention: string
      campaign_item_rules_of_giveaway: string
      campaign_item_datetime: string
      campaign_item_interview: string
      campaign_item_location: string
      campaign_item_terms: string
      files?: [
        {
          campaign_item_file_filename: string
          campaign_item_id: string
          base64_file: string
        }
      ]
    }
  ]
}
