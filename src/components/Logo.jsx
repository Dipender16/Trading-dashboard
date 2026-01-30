import React from 'react'

function Logo({
  src= "/LOGO.png",
  className
}) {
  return (
    <img className={`w-20 md:w-36 ${className}`} src={src} alt="" />
  )
}

export default Logo