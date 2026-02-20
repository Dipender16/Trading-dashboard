
function Logo({
  src= "https://fra.cloud.appwrite.io/v1/storage/buckets/6968ebb4002826baec66/files/6998be27002b41621ceb/view?project=6968ea76002a08be25e4&mode=admin",
  className
}) {
  return (
    <img className={`w-24 md:w-36 ${className}`} src={src} alt="" />
  )
}

export default Logo