import { useState } from "react"
import logo from "./1744047016978.png"

export default function AppHeader (){
    const [searchBar,setsearchBar]=useState(false)
    const [nav,setnav] = useState(false)
    return (
        <div style={{background : 'white' }} className="h-28 w-full opacity-95 sticky top-0 flex max-md:justify-between items-center px-6 backdrop-blur-lg text-black z-50">
          <a style = {{display: "inline-block"}} href="https://www.orientalparfum.shop"> <img className=" h-full" src={logo} alt=""  /> </a>
            
            
            <ul className="h-full w-full mx-5 flex items-center justify-evenly max-md:hidden">
                <li className="h-4 flex items-center justify-center">
                <a href="/#Home" className="hover:border-b-2 border-orange-300 hover:text-orange-300 cursor-pointer font-semibold ">Home</a>
                </li>
                
                <li className="h-4 flex items-center justify-center">
                <a  href="/#Fragrences"className="hover:border-b-2 border-orange-300 hover:text-orange-300  font-semibold ">Fragrances</a>
                </li>
                <li className="h-4 flex items-center justify-center">
                <a href="/#Contact" className="hover:border-b-2 border-orange-300 hover:text-orange-300 font-semibold ">Contact</a>
                </li>
            </ul>
            <div className=""><button onClick={()=>{setnav(true)}} className="h-12 w-12 p-2 hover:bg-gray-300 bg-white rounded-full md:hidden"> <img src="https://www.svgrepo.com/show/532195/menu.svg" alt="" /> </button>
                </div>
            {nav? <div className="fixed top-0 bottom-0 left-0 h-screen w-full md:hidden text-black">
                <div className=" h-full w-full bg-white flex animate__animated animate__fadeInLeft ">
              
                <svg onClick={()=>{setnav(false)}} className="h-12 w-12 cursor-pointer absolute right-4 top-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
                </svg>

                    <ul className="h-full w-full mx-5 flex-col place-content-evenly ">
                <li className=" flex h-1/4 items-center justify-center">
                <a href="/#Home" className="hover:border-b-2 border-black cursor-pointer font-semibold ">Home</a>
                </li>
                <li className=" flex  h-1/4 items-center justify-center">
                <a  href="/#Fragrences"className="hover:border-b-2 border-black font-semibold ">Fragrances</a>
                </li>
                <li className=" flex h-1/4 items-center justify-center">
                <a href="/#Contact" className="hover:border-b-2 border-black font-semibold ">Contact</a>
                </li>
            </ul>
                </div>

            </div> : <></>}
            
            

        </div>
    )
}
