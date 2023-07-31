export interface BrandProfile {
  file_name?: string
  first_name: string
  last_name: string
  email: string
  role: string
  date_of_birth: string
  phone_number: string
  phone_code: string | null
  nationality: string
  location: string
  link: string
  brand_sub: string
}

export type BrandData = {
  brand: {
    background_file_name?: string
    logo_file_name?: string
    sub: string
    official_name: string
    contact_first_name: string
    contact_last_name: string
    sector: string
    website: string
    phone_number: string
    phone_code: string | null
    email: string
    description: string
    background_link: string
    logo_link: string
  }
  countries: string[]
}

export type BrandSectors = string[]
