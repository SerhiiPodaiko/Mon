import { MetadataRoute } from 'next'
// import { fetchGetProducts } from '@lib/api/Marketplace/fetchProducts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultURL = 'https:/staging-frontend.monetiseur.io'

  // const sportsman = await fetchGetProducts({
  //   order_by: ['price desc', 'name asc'],
  //   with_count: true
  // })

  return [
    {
      url: `${defaultURL}/`,
      lastModified: new Date()
    },
    {
      url: `${defaultURL}/marketplace`,
      lastModified: new Date()
    }
    // All RH-ers links
    // ...sportsman.items.map((s) => ({
    //   url: `${defaultURL}/marketplace/${s.right_holder.rights_holder_sub}`,
    //   lastModified: new Date()
    // }))
  ]
}
