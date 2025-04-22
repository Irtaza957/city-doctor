import Footer from '@/components/Footer'
import ThankYou from '@/components/thank-you'
import React from 'react'

const PaymentSuccessfull = () => {
  return (
    <>
      <ThankYou isPayment={true} />
      <Footer />
    </>
  )
}

export default PaymentSuccessfull