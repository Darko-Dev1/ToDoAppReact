import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { FaSearch } from "react-icons/fa";

const SearchTab = ({ searching }) => {

    const [invalue, setinvalue] = useState("")
    const [collor, setcollor] = useState("white")
    const [toDos, settoDos] = useState([])
    const [recentResults, setrecentResults] = useState([])
    const [show, setshow] = useState("none")
    const [fulldata, setfulldata] = useState([])


    useEffect(() => {

        const filteredList = searching.filter((element) =>
            element.title.toLowerCase().includes(invalue.toLowerCase())
        );

        settoDos(filteredList);

        setrecentResults([])
        filteredList.forEach((element, i) => {
            if (i < 10) {
                setrecentResults((prev) => [...prev, element])
            }
        })

    }, [invalue])

    useEffect(() => {
        if (!searching) {
            return
        };

        setfulldata(searching)

    }, [])

    return (
        <>
            <header className='bg-black w-full flex flex-col text-white p-4 items-center focus-within:sticky focus-within:top-0'>
                <div>
                    <div className='border flex '>
                        <input type="text" className='outline-0 p-1' placeholder='search here' value={invalue} onChange={(e) => { setinvalue(e.target.value); e.target.value === "" ? setshow("none") : setshow("block") }} />
                        <button type="submit" id='searchBtn' className='p-2 bg-black border-l-2 border-0 hover:bg-white transition' onMouseOver={() => { setcollor("red") }} onMouseLeave={() => { setcollor("white") }} onClick={() => { document.getElementById("infosearch").innerHTML = "Search Result For: " + "<bold>" + document.querySelector('input').value + "</bold>" }}>
                            <FaSearch fill={collor} className='transition' />
                        </button>
                    </div>
                    <div id='searchresult' className='absolute bg-black' style={{ display: show }}>
                        <ol>
                            {recentResults.map((e, i) => {
                                return (<li className='p-2 hover:border transition cursor-pointer' key={e.id}>{i + 1}. {e.title}</li>)
                            })}
                        </ol>
                    </div>
                </div>
                <div id='searchResultFor'>
                    <h1 id='infosearch'></h1>
                </div>
            </header>
            <main className='bg-gray-500 p-4 grid grid-cols-2 gap-3 text-white flex'>
                <div id="yes">
                    {fulldata.map((e) => {
                        if(e.completed === true) {
                            return(<div key={e.id} className='flex justify-between p-5 border'>{e.title} <h1>{e.completed.toString()}</h1></div>);
                        } 
                    })}
                </div>
                <div id="no">
                    {fulldata.map((e) => {
                        if(e.completed === false) {
                            return(<div key={e.id} className='flex justify-between p-5 border'>{e.title} <h1>{e.completed.toString()}</h1></div>);
                        } 
                    })}
                </div>
            </main>
        </>

    )
}

export default SearchTab
