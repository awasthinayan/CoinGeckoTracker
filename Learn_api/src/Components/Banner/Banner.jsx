const Banner = () => {
  return (
    <div className="h-[25rem] relative w-full">
        <img className="h-full w-full" src="https://t3.ftcdn.net/jpg/10/88/31/58/240_F_1088315895_mr695TSfIi51Az1r4obyHT5XfIyllWfr.jpg" alt="simple image" />
    
    <div className="absolute top-20 left-0 right-0 mx-auto w-[30rem]">
  <div className="flex flex-col gap-5">
    <div className="glow font-semibold text-7xl text-white">
      Crypto Tracker
    </div>
    <div className="glow font-semibold text-text-white text-center text-3xl w-[33rem] mx-auto left-0 right-0">
      Get all info regarding cryptocurrencies
    </div>
  </div>
</div>
</div>
  )
}

export default Banner