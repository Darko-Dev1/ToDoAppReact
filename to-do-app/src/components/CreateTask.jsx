import React, { useState } from 'react'

const CreateTask = ({ show = "none" }) => {
  const [valueTask, setvalueTask] = useState("")

  const addingTaskhere = document.getElementById("no")
  const changeTaskhere = document.getElementById("yes")
  const taskAdd = document.getElementById("taskAdder")

  return (
    <div className='bg-gray-500 border-b-2 border-white w-[100%] h-[90vh] py-40' style={{ display: `${show}` }}>
      <div className=' h-[100%] flex flex-col justify-center p-10 md:items-center gap-10'>
        <input id='taskAdder' type="text" className='border' placeholder='ex. Drink tea' value={valueTask} onChange={(e) => setvalueTask(e.target.value)} />
        {/* this would send data to an actual server... */}
        {/* however right now this data will only be just shown white the session is still on :D */}
        <button onClick={() => {
          const makeDiv = document.createElement("div")
          makeDiv.setAttribute("id", Math.floor(Math.random() * 100000))
          makeDiv.setAttribute("class", "flex justify-between p-5 border-b-2 cursor-pointer transition")
          makeDiv.innerHTML = taskAdd.value + "<h1>false</h1>"
          makeDiv.addEventListener("click", (e) => {
            if (e.target.querySelector("h1").innerHTML === "false") {
              e.target.querySelector("h1").innerHTML = "true"
              changeTaskhere.append(makeDiv)
              try {addingTaskhere.removeChild(e.target)} catch{ return}
              console.log(e.target)

            } else {
              changeTaskhere.removeChild(e.target)
              addingTaskhere.appendChild(makeDiv)
              e.target.querySelector("h1").innerHTML = "false"

            }
          })
          addingTaskhere.appendChild(makeDiv)

          console.log(addingTaskhere)
          taskAdd.value = ""
        }} className='bg-black text-white p-3 rounded'>Create Task</button>
      </div>
    </div>
  )
}

export default CreateTask
