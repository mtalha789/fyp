
import SearchInput from "./SearchInput";

function Hero(props) {
  return (
    <>
      <div className="bg-hero-pattern h-[70vh] content-center text-center relative overflow-hidden bg-cover flex flex-col justify-center">
        <span className="font-extrabold text-8xl text-inherit text-white my-4">
          Mealo
        </span>
        <div>
          <h1 className="font-bold text-3xl text-inherit text-white my-4">
            Discover the best food & drinks
          </h1>
        </div>
        <div className="flex justify-center">
          <SearchInput />
        </div>
      </div>
    </>
  );
}

export default Hero;
