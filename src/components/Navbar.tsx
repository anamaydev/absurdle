import LockedIcon from "./icons/LockedIcon";
import Logo from "./icons/Logo";

const Navbar = () => {
  return (
    <header>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="trapezoid-mobile" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 0.8,0.917 A 0.083,0.083 0 0 1 0.717,1 L 0.283,1 A 0.083,0.083 0 0 1 0.2,0.917 Z" />
          </clipPath>

          {/* Path calculated for desktop size (h-16 w-52.5 -> 64px by 210px) */}
          <clipPath id="trapezoid-desktop" clipPathUnits="objectBoundingBox">
            {/* Path for 4px radius */}
            {/*<path d="M 0,0 L 1,0 L 0.905,0.9375 A 0.019,0.0625 0 0 1 0.886,1 L 0.114,1 A 0.019,0.0625 0 0 1 0.095,0.9375 Z" />*/}

            {/* Path for 8px radius */}
            {/*<path d="M 0,0 L 1,0 L 0.905,0.875 A 0.038,0.125 0 0 1 0.867,1 L 0.133,1 A 0.038,0.125 0 0 1 0.095,0.875 Z" />*/}

            {/*Path for 6px radius*/}
            <path d="M 0,0 L 1,0 L 0.905,0.906 A 0.029,0.094 0 0 1 0.876,1 L 0.124,1 A 0.029,0.094 0 0 1 0.095,0.906 Z" />
          </clipPath>
        </defs>
      </svg>

      <nav className="flex gap-6 items-center justify-center font-rhodium-libre font-normal text-base md:text-md cursor-pointer text-grey-800">
        <p className="basis-20 shrink-0 grow-0 text-end hover:text-white transform transition-colors duration-300">Stats</p>
        <div className="clip-trapezoid-mobile md:clip-trapezoid-desktop h-12 w-20 md:h-16 md:w-52.5 flex justify-center items-center bg-grey-900">
          <LockedIcon className={"h-8 w-8 md:hidden"}/>
          <Logo className={"hidden md:block"}/>
        </div>
        <p className="basis-20 shrink-0 grow-0 text-start hover:text-white transform transition-colors duration-300">Log out</p>
      </nav>
    </header>
  )
}
export default Navbar
