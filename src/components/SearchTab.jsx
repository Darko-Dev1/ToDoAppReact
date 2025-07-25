import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import CreateTask from './CreateTask';

const SearchTab = ({ searching }) => {

    const [invalue, setinvalue] = useState("")
    const [collor, setcollor] = useState("white")
    const [toDos, settoDos] = useState([])
    const [recentResults, setrecentResults] = useState([])
    const [show, setshow] = useState("none")
    const [fulldata, setfulldata] = useState([])
    const [toTrue, settoTrue] = useState(false)
    const [showCreateMenu, setshowCreateMenu] = useState("none")


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
                            <input type="text" className='outline-0 p-1 bg-black w-[100%]' placeholder='search here' value={invalue} onClick={()=> {setshow("block") }} onChange={(e) => { setinvalue(e.target.value); e.target.value === "" ? setshow("none") : setshow("block") }} />
                            <button type="submit" id='searchBtn' className='p-2 bg-black border-l-2 border-0 hover:bg-white transition' onMouseOver={() => { setcollor("red") }} onMouseLeave={() => { setcollor("white");  }} onClick={() => {
                                document.getElementById("infosearch").innerHTML = "Search Result For: " + "<b>" + document.querySelector('input').value + "</b>";
                                const serachResult = fulldata.filter((value) => {
                                    return value.title.includes(document.querySelector('input').value)
                                })
                                serachResult.forEach((e) => {
                                    document.getElementById(e.id).style.backgroundColor = "blue"
                                    setTimeout(() => {
                                        document.getElementById(e.id).style.backgroundColor = "transparent"
                                    }, 5000)
                                })
                                setshow("none")

                            }}>
                                <FaSearch fill={collor} className='transition' />
                            </button>
                        </div>
                        <div id='searchResultFor'>
                            <h1 id='infosearch'></h1>
                        </div>
                        <div id='searchresult' className='relative bg-black ' style={{ display: show }}>
                            <ol className='w-xs'>
                                {recentResults.map((e, i) => {
                                    return (<li className='p-2 hover:border transition cursor-pointer overflow-hidden' onClick={
                                        (z) => {
                                            console.log(z.target)
                                            let valueLi = z.target.getAttribute("value")
                                            console.log(valueLi)
                                            console.log(document.getElementById(valueLi))

                                            document.getElementById(valueLi).scrollIntoView({ behavior: 'smooth', block: 'center', })
                                            document.getElementById(valueLi).style.backgroundColor = "blue"
                                            setTimeout(() => {
                                                document.getElementById(valueLi).style.backgroundColor = "transparent"
                                            }, 2000)
                                        }
                                    }
                                        key={e.id}><b className='pr-[70%] relative whitespace-pre p-2' value={e.id}>{i + 1}. {e.title}</b></li>)
                                })}
                            </ol>
                        </div>
                    </div>

                </div>

            </header>
            <button className='absolute w-[20%] bg-black text-white m-3 left-[50%] -translate-[55%] my-8 p-1 rounded' onClick={()=> {showCreateMenu === "none" ? setshowCreateMenu("block") : setshowCreateMenu("none");}}>Create a Task</button>
            <CreateTask show={showCreateMenu}></CreateTask>
            <main className='bg-gray-500 p-14 grid md:grid-cols-2 gap-3  text-white py-15 gird-cols-1 gird-direction-' onMouseDown={() => {setshow("none") }}>

                <div id="yes" className='order-2 md:order-1 border-green-500 border-4 h-[70vh] relative overflow-auto'>
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
                                    className='flex justify-between p-5 border-b-2 cursor-pointer transition'
                                    onClick={(z) => {
                                        const id = e.id;
                                        console.log(z.target)
                                        const updated = fulldata.map((i) =>
                                            i.id === id ? { ...i, completed: false } : i
                                        );
                                        setfulldata(updated);
                                    }}
                                >
                                    {e.title} <h1>{e.completed.toString()}</h1>
                                </div>
                            ))
                    }
                </div>
                <div id="no" className='order-1 md:order-2 border-red-500 border-4 h-[70vh] relative overflow-auto'>
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
                                    className='flex justify-between p-5 border-b-2 cursor-pointer transition'
                                    onClick={(z) => {
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
