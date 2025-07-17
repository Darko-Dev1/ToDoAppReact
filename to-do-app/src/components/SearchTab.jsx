import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";

const SearchTab = ({ searching }) => {

    const [invalue, setinvalue] = useState("")
    const [collor, setcollor] = useState("white")
    const [toDos, settoDos] = useState([])
    const [recentResults, setrecentResults] = useState([])
    const [show, setshow] = useState("none")
    const [fulldata, setfulldata] = useState([])
    const [toTrue, settoTrue] = useState(false)


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
            <header className='bg-black w-full flex flex-col text-white p-4 items-center focus-within:sticky z-100 focus-within:top-0 transition'>
                <div >
                    <div className='flex flex-col items-center' >
                        <div className='border relative flex justify-between w-[280px]'>
                            <input type="text" className='outline-0 p-1 bg-black w-[100%]' placeholder='search here' value={invalue} onChange={(e) => { setinvalue(e.target.value); e.target.value === "" ? setshow("none") : setshow("block") }} />
                            <button type="submit" id='searchBtn' className='p-2 bg-black border-l-2 border-0 hover:bg-white transition' onMouseOver={() => { setcollor("red") }} onMouseLeave={() => { setcollor("white") }} onClick={() => { document.getElementById("infosearch").innerHTML = "Search Result For: " + "<b>" + document.querySelector('input').value + "</b>" }}>
                                <FaSearch fill={collor} className='transition' />
                            </button>
                        </div>
                        <div id='searchResultFor'>
                            <h1 id='infosearch'></h1>
                        </div>
                        <div id='searchresult' className='relative bg-black ' style={{ display: show }}>

                            <ol className=''>
                                {recentResults.map((e, i) => {
                                    return (<li className='p-2 hover:border transition cursor-pointer w-[100%]' key={e.id}>{i + 1}. {e.title}</li>)
                                })}
                            </ol>
                        </div>
                    </div>

                </div>

            </header>
            <button className='absolute w-[20%] bg-black text-white m-3 left-[50%] -translate-[55%] my-8 p-1 rounded'>Create a Task</button>
            <main className='bg-gray-500 p-4 grid grid-cols-2 gap-3 text-white py-15'>



                <div id="yes" className=' border-green-500 border-4 h-[70vh] relative overflow-auto'>
                    <div id="title" className='bg-black text-center p-2 sticky top-0 '>
                        <h1 className='text-4xl'>Tasks Done:</h1>
                    </div>
                    {
                        fulldata
                            .filter((e) => e.completed)
                            .map((e) => (
                                <div
                                    key={e.id}
                                    id={e.id}
                                    className='flex justify-between p-5 border-b-2 cursor-pointer'
                                    onClick={() => {
                                        const id = e.id;
                                        const updated = fulldata.map((i) =>
                                            i.id === id ? { ...i, completed: false } : i
                                        );
                                        setfulldata(updated);
                                        console.log("works")
                                    }}
                                >
                                    {e.title} <h1>{e.completed.toString()}</h1>
                                </div>
                            ))
                    }
                </div>
                <div id="no" className='border-red-500 border-4 h-[70vh] relative overflow-auto'>
                    <div id="title" className='bg-black text-center p-2 sticky top-0 '>
                        <h1 className='text-4xl'>Tasks Not Done:</h1>
                    </div>
                    {
                        fulldata
                            .filter((e) => !e.completed)
                            .map((e) => (
                                <div
                                    key={e.id}
                                    id={e.id}
                                    className='flex justify-between p-5 border-b-2 cursor-pointer'
                                    onClick={() => {
                                        const id = e.id;
                                        const updated = fulldata.map((i) =>
                                            i.id === id ? { ...i, completed: true } : i
                                        );
                                        setfulldata(updated);
                                    }}
                                >
                                    {e.title} <h1>{e.completed.toString()}</h1>
                                </div>
                            ))
                    }
                </div>
            </main>
        </>

    )
}

export default SearchTab
