import Footer from '@/components/Footer'
import ThankYou from '@/components/thank-you'
import React from 'react'

const PaymentFailed = () => {
  return (
    <>
      <ThankYou paymentFailed={true} />
      <Footer />
    </>
  )
}

export default PaymentFailed