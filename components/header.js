import Link from 'next/link';

export default function Header() {
  return (
    <>
      <div className="sticky top-0 w-full z-50 bg-blue-100">
        <div className="flex justify-center text-5xl font-semibold">
          <div className="relative  w-auto text-gray-700">Cl
            {/* Mouse Clicking SVG */}
            <svg xmlns="http://www.w3.org/2000/svg"
              className="absolute z-50 top-2 left-12 transform scale-150 rotate-12 inline h-8 w-8"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 
                  7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            &nbsp;&nbsp; cker
          </div>
        </div>

        <div className="justify-around grid grid-cols-2 ">
          <Link href="/">
            <a className="border-gray-400 text-center overflow-hidden text-gray-700
                      transform hover:scale-110 transition ease-in 
                      border-b-2 m-2 text-2xl">
              Home
            </a>
          </Link>

          <Link href="/leaderboard">
            <a className="border-gray-400 text-center overflow-hidden text-gray-700
                      transform hover:scale-110 transition ease-in 
                      border-b-2 m-2 text-2xl">
              Leaderboard
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}