import { Deals } from '@components/UserDashboard'

const Page = ({ params }: { params: { pageId: string } }) => {
  return <Deals page={params.pageId} />
}

export default Page
