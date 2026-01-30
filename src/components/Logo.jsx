import React from 'react'

function Logo({
  src= "https://app.tradezella.com/static/media/tradezella-logo.db71bfd13dce99dd3e33.png",
  className
}) {
  return (
    <img className={`w-8 md:w-12 ${className}`} src={src} alt="" />
  )
}

export default Logo