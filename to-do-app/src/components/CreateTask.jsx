import React from 'react'

const CreateTask = ({show = "none"}) => {
  console.log(show)
  return (
    <div className='bg-amber-200 w-[30%]' style={{display: `${show}`}}>
      <form>
        <input type="text" />
        <button type="submit">Create Task</button>
      </form>
    </div>
  )
}

export default CreateTask
