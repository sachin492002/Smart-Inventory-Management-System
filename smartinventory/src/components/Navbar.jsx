import {CiHome, CiSquareInfo} from "react-icons/ci";
import {FaArrowTrendUp} from "react-icons/fa6";

export default function Navbar(){
    return (
        <header className="bg-white shadow-lg h-24 hidden md:flex">
            <a href="" className=" flex-shrink-0 flex items-center justify-center lg:px-6 xl:px-8">
                <img className="" src="/inventory.png" alt=""/>
            </a>
            <nav className="header-links contents font-semibold text-base lg:text-lg">
                <ul className="flex items-center justify-between w-full ml-4 xl:ml-8 mr-auto">
                    <li className="p-3 xl:p-6 active">
                        <a href="/">
                            <span className='inline-flex justify-center gap-2 items-center'><CiHome className='text-4xl'/>Home</span>
                        </a>
                    </li>
                    <li className="p-3 xl:p-6">
                        <a href="trends">
                            <span className='inline-flex justify-center gap-2 items-center'><FaArrowTrendUp className='text-4xl' />Trends</span>
                        </a>
                    </li>
                    <li className="p-3 xl:p-6">
                        <a href="">
                            <span className='inline-flex justify-center gap-2 items-center'><CiSquareInfo
                                className='text-4xl'/>About</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}