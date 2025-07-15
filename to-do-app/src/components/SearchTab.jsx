import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";

const SearchTab = () => {

    const [invalue, setinvalue] = useState("")
    const [collor, setcollor] = useState("white")

    return (
        <header className='bg-black w-full flex justify-center text-white p-4 items-center'>
            <div className='border flex '>
                <input type="text" className='outline-0 p-1' placeholder='here' value={invalue} onChange={(e) => {setinvalue(e.target.value)}} />
                <button type="submit" className='p-2 bg-black border-l-2 border-0 hover:bg-white transition' onMouseOver={() => {setcollor("red")}} onMouseLeave={() => {setcollor("white")}}>
                    <FaSearch fill={collor} className='transition'/>
                </button>
            </div>

        </header>
    )
}

export default SearchTab
