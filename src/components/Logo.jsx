
function Logo({
  src= "/LOGO.png",
  className
}) {
  return (
    <img className={`w-24 md:w-36 ${className}`} src={src} alt="" />
  )
}

export default Logo