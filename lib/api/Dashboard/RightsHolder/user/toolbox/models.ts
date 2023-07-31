export type Categories = {
  created: string
  updated: string
  product_category_platform_id: string
  product_category_platform_name: string
  product_category_platform_order_num: number
  product_category_platform_filter_in_title: boolean | null
  product_category_groups: CategoryGroup[]
}

export type CategoryGroup = {
  created: string
  updated: string
  product_category_group_id: string
  product_category_platform_id: string
  product_category_group_order_num: number
  /**
   * Card name
   */
  product_category_group_name: string
  product_category_group_picture: string
  product_category_group_item_switch_category_caption: string
  product_category_group_item_duration: boolean
  product_category_group_item_duration_required: boolean
  product_category_group_item_duration_dropdown: string
  product_category_group_item_post_description: boolean
  product_category_group_item_post_description_required: boolean
  product_category_group_item_hashtag: boolean
  product_category_group_item_hashtag_required: boolean
  product_category_group_item_link: boolean
  product_category_group_item_link_required: boolean
  product_category_group_item_mention: boolean
  product_category_group_item_mention_required: boolean
  product_category_group_item_rules_of_giveaway: boolean
  product_category_group_item_rules_of_giveaway_required: boolean
  product_category_group_item_datetime: boolean
  product_category_group_item_datetime_required: boolean
  product_category_group_item_interview: boolean
  product_category_group_item_interview_required: boolean
  product_category_group_item_location: boolean
  product_category_group_item_location_required: boolean
  product_category_group_item_terms: boolean
  product_category_group_item_terms_required: boolean
  product_category_categories: ProductCategory[]
}

export type NewCategories = {
  created: string
  updated: string
  product_category_platform_id: string
  product_category_platform_name: string
  product_category_platform_order_num: number
  product_category_platform_filter_in_title: boolean
  product_category_groups: [
    {
      created: string
      updated: string
      product_category_group_id: string
      product_category_platform_id: string
      product_category_group_order_num: number
      product_category_group_name: string
      product_category_group_picture: string
      product_category_group_item_switch_category_caption: string
      product_category_group_item_duration: boolean
      product_category_group_item_duration_required: boolean
      product_category_group_item_duration_dropdown: string
      product_category_group_item_post_description: boolean
      product_category_group_item_post_description_required: boolean
      product_category_group_item_hashtag: boolean
      product_category_group_item_hashtag_required: boolean
      product_category_group_item_link: boolean
      product_category_group_item_link_required: boolean
      product_category_group_item_mention: boolean
      product_category_group_item_mention_required: boolean
      product_category_group_item_rules_of_giveaway: boolean
      product_category_group_item_rules_of_giveaway_required: boolean
      product_category_group_item_datetime: boolean
      product_category_group_item_datetime_required: boolean
      product_category_group_item_interview: boolean
      product_category_group_item_interview_required: boolean
      product_category_group_item_location: boolean
      product_category_group_item_location_required: boolean
      product_category_group_item_terms: boolean
      product_category_group_item_terms_required: boolean
      product_category_categories: [
        {
          created: string
          updated: string
          product_category_id: string
          product_category_group_id: string
          product_category_order_num: number
          product_category_name: string
          product_category_short_name: string
          product_category_description: string
          product_category_picture: string
          product_category_icon: string
        }
      ]
    }
  ]
}

export type ProductCategory = {
  created: string
  updated: string
  product_category_id: string
  product_category_group_id: string
  product_category_order_num: number
  /**
   * Category name like Instagram, Twitter etc
   */
  product_category_name: string
  product_category_short_name: string
  product_category_description: string
  /**
   * SVG card image
   */
  product_category_picture: string
  /**
   * Icon of category like Instagram, Twitter icons
   */
  product_category_icon: string
}
// link/product_category_id

export type RightHolderProducts = {
  items: RightHolderProductsItem[]
  total: number
}

export type RightHolderProductsItem = {
  ProductModel: {
    created: string
    product_rights_holder_sub: string
    product_price: number
    product_show: boolean
    product_id: string
    updated: string
    product_category_id: string
    product_available_count: number
  }
}

export type ProductPutData = {
  product_category_id: string
  product_id: string
  product_price: number
  product_available_count: number
  product_show: boolean
}
