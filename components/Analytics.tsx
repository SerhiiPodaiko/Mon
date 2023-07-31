import Script from 'next/script'

const Analytics = () => {
  const NEXT_PUBLIC_G_TAG =
    process.env.NODE_ENV === 'production'
      ? process.env.STAGING_NEXT_PUBLIC_G_TAG
      : process.env.DEV_NEXT_PUBLIC_G_TAG

  return (
    <div className='container'>
      {/*Global site tag (gtag.js) - Google Analytics*/}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_G_TAG}`}
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${NEXT_PUBLIC_G_TAG}');
        `}
      </Script>
    </div>
  )
}

export default Analytics
