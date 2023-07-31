import { ToolboxProductPage } from '@components/UserDashboard'

const Page = ({ params }: { params: { product_key: string } }) => {
  return <ToolboxProductPage params={params} />
}

export default Page
