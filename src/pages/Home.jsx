import React from 'react'
import QRCodeGenerator from '../components/QRCodeGenerator/QRCodeGenerator'
function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
      <QRCodeGenerator />
    </div>
    </>
  )
}

export default Home
