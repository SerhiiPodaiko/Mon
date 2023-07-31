'use client'
import BrandInvoices from '@components/UserDashboard/Deals/BrandInvoices/BrandInvoices'
import { MappedData } from '@components/UserDashboard/Deals/Deals'

const TableOptions = ({ page, data }: { page: string; data: MappedData[] }) => {
  // Filter and sort the data based on specific conditions
  const filteredData = data
    .map((brand) => ({
      ...brand,
      items: brand.items
        .filter((i) => i.status !== 'PAYMENT_PENDING')
        .sort((a, b) => new Date(a.created).getTime() + new Date(b.created).getTime())
    }))
    .sort((a, b) => new Date(a.items[0].created).getTime() + new Date(b.items[0].created).getTime())

  return (
    <>
      {filteredData.map((brand, i) => {
        // Determine the range of brands to display based on the current page
        if (i + 1 <= Number(page) * 3 && i + 1 > (Number(page) - 1) * 3) {
          return <BrandInvoices brand={brand} key={brand.brandPK} />
        }
      })}
    </>
  )
}

export default TableOptions
