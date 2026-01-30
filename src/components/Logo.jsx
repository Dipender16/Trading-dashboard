import logo from "../assets/logo.png";

function Logo({
  src= logo,
  className
}) {
  return (
    <img className={`w-24 md:w-36 ${className}`} src={src} alt="" />
  )
}

export default Logo