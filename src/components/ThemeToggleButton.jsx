import { useState } from "react"
import { FiSettings } from 'react-icons/fi';
import "../styles/ThemeToggleButton.scss";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const themeColors = [
   'Woman', 'Simple', 'Kids'
]
const ThemeToggleButton = () => {
    const [open, setOpen] = useState(false)

    const { colorMode, setColorMode } = useContext(ThemeContext);

    return (
        <div className="theme-toggle-button">
            <button onClick={() => setOpen((prevState) => !prevState)}><FiSettings /></button>
            <div className={`theme-list ${open && 'open'}`}>
                {
                    themeColors.map((themeColor) => (
                        <button className={`color-item ${themeColor} ${colorMode === themeColor && 'active'}`} onClick={()=>setColorMode(themeColor)}>{themeColor}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default ThemeToggleButton