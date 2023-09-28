import React from 'react'

const Alert = () => {
  return (
    <div className="fixed top-0 right-0 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        <p className="font-bold">Be Warned</p>
        <p>Something not ideal might be happening.</p>
    </div>
  )
}

export default Alert