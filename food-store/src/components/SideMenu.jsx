import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "@nextui-org/react"
import { MenuIcon } from "lucide-react"

const SideMenu = ({ navList, bgColor, textColor }) => {
    const [menuHidden, setMenuHidden] = useState(true)
    const toggleMenuHidden = () => {
        setMenuHidden(menuHidden => !menuHidden)
    }

    if (!navList) {
        return <p>No menu to display</p>
    }

    return (
        <>
            <div className="md:hidden p-2 flex items-center justify-between">
                <h1 className={`${!menuHidden && 'hidden'} text-2xl font-bold`}>Logo</h1>
                <Button onClick={toggleMenuHidden} className={`z-10 ${!menuHidden && 'absolute top-3 right-3'}`}>
                    <MenuIcon />
                </Button>

            </div>
            <div className={`sticky md:block ${menuHidden ? 'hidden' : ''} top-0 pt-4 h-screen transition-all duration-300 ease-in-out pl-4`}>
                <div className="flex flex-row md:flex-col justify-between md:items-center">
                    <nav className="mt-10 w-full space-y-4">
                        <ul className="space-y-2">
                            {navList.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item.path}
                                        end
                                        className={({ isActive }) => `flex items-center p-2  hover:text-white hover:bg-black text-lg font-medium rounded-l-lg ${isActive }`}  
                                    >
                                        <span className="ml-3">{item.name}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default SideMenu