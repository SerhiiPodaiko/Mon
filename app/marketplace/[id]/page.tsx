import SingleMarketplaceWrapper from '@components/SingleMarketplace/SingleMarketplaceWrapper'
// import favicon from '@public/favicon.jpeg'
// import {fetchGetProducts} from "@lib/api/Marketplace/fetchProducts"

// const DOMAIN = (process.env.NEXT_PUBLIC_DOMAIN || '').replace(/\/$/, '')
// export async function generateMetadata({ params }: {params: {id: string}}) {
//   const res = await fetchGetProducts({
//     order_by: ['price desc', 'name asc'],
//     with_count: true
//   })
//   const rightHolder = res.items.find(user => user.right_holder.rights_holder_sub === params.id)
//   return {
//     title: rightHolder ? `${rightHolder?.right_holder.first_name} ${rightHolder?.right_holder.last_name}` : 'Athlete',
//     // Add description
//     description: '123213',
//     // Add keywords
//     keywords: ['123', '123123213'],
//     openGraph: {
//       title: 'Marketplace',
//       description: '12312312321',
//       url: `${DOMAIN}/marketplace`,
//       siteName: 'Monetiseur',
//       images: [
//         {
//           url: favicon.src,
//           width: 249,
//           height: 29
//         }
//       ],
//       locale: 'en_US',
//       type: 'website'
//     }
//   }
// }

const MarketplaceAthletePage = ({ params }: { params: { id: string } }) => (
  <SingleMarketplaceWrapper id={params.id} />
)

export default MarketplaceAthletePage
