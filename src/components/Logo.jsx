import React from 'react'

function Logo({
  src= "https://cdn.prod.website-files.com/630df394ff44d46a174df570/681e760acf7f6359cb35f535_logo.png"
}) {
  return (
    <img className='w-36' src={src} alt="" />
  )
}

export default Logo