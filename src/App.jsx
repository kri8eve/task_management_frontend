/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react'
import './App.css'
import TaskItem from './components/TaskItem'

const baseUrl = 'http://localhost:9999'

function App() {
 const [text,setText] = useState('')
 const [tasks,setTasks] = useState([])
 const [filteredTasks,setFilteredTasks] = useState([])
 const [selectedTask, setselectedTask] = useState(null)
 const [completedFilter, setCompletedFilter] = useState(0)

function handleEdit(task){
  setText(task.text)
  setselectedTask(task)
}

async function handleDelete(task){
  try{
    const resp = await fetch(`http://localhost:9999/api/task/${task.id}`,{
      method:'DELETE'
    })
    const data = await resp.json()
    if(resp.status ===200){
      getTask()
    } 
  }catch(err){
    alert(err)
  }
}
async function handleComplete(task){
  try{
    const resp = await fetch(`http://localhost:9999/api/task/${task.id}`,{
        method:'PUT',
        headers:{
          'Content-type':'Application/json'
        },
        body:JSON.stringify({...task,isCompleted:true})
      })
      const data = await resp.json()
      if(resp.status ===200){
        getTask()
      }
  }catch(err){
    alert(err)
  }
}

 async function addTask(e){
  e.preventDefault()
    try{
      if(!text || text==''){
        throw new Error('Task must not be empty')
      }
      const resp = await fetch('http://localhost:9999/api/task',{
        method:'POST',
        headers:{
          'Content-type':'Application/json'
        },
        body:JSON.stringify({text})
      })
      const data = await resp.json()
      if(resp.status ===200){
        setText('')
        setTasks(prev=>[...prev,data.task])
      } 
    }catch(err){
      alert(err)
    }
  

 }
 
 async function editTask(e){
  e.preventDefault()
    try{
      if(!text || text==''){
        throw new Error('Task must not be empty')
      }
      const resp = await fetch(`http://localhost:9999/api/task/${selectedTask.id}`,{
        method:'PUT',
        headers:{
          'Content-type':'Application/json'
        },
        body:JSON.stringify({...selectedTask,text})
      })
      const data = await resp.json()
      if(resp.status ===200){
        setText('')
        getTask()
        setselectedTask(null)
      } 
    }catch(err){
      alert(err)
    }
  

 }

async function getTask(){
  try{
    const resp = await fetch('http://localhost:9999/api/task')
    const data = await resp.json()
    if(resp.status === 200){
      setTasks(data)
    }
  }catch(err){
    alert(err)
  }
}


useEffect(()=>{
  getTask()
},[])
useEffect(()=>{
  switch (completedFilter) {
    case 0:
      setFilteredTasks(tasks)
      break;
    case 1:
      setFilteredTasks(tasks.filter(t=>t.isCompleted))
      break;
    case 2:
      setFilteredTasks(tasks.filter(t=>!t.isCompleted))
      break;
  
    default:
      break;
  }
},[completedFilter,tasks])


  return (
    <>
    <div className='w-[85%] mx-auto '>

   
      <p className='text-2xl py-4 mb-4'>Task management application</p>
      <div>
        <div className='mb-6'>
        <form  onSubmit={addTask} className='w-full flex items-center'>
        <input type='text' placeholder='Enter Task' value={text}  onChange={(e)=>setText(e.target.value)} className=' flex-1 w-full px-4 py-2 text-[#000]'/>
        {
          selectedTask ? 
          <button className='px-4 py-2 bg-emerald-500 text-white' type='submit' onClick={editTask}>Update</button>
          :
          <button className='px-4 py-2 bg-emerald-500 text-white' type='submit' onClick={addTask}>Add</button>
        }
        
        </form>
        </div>
       <div>
        <div className='py-2 flex items-center justify-between'>
          <p>All tasks</p>
          <div className='flex items-center space-x-4'>
            <button type="" onClick={()=>setCompletedFilter(0)} style={{color:completedFilter===0 ? '#2FF4A2':'#959595'}}>All</button>
            <button type="" onClick={()=>setCompletedFilter(1)} style={{color:completedFilter===1 ? '#2FF4A2':'#959595'}}>Completed</button>
            <button type="" onClick={()=>setCompletedFilter(2)} style={{color:completedFilter===2 ? '#2FF4A2':'#959595'}}>Not Completed</button>
          </div>
        </div>
        <div>
          { 
          tasks.length > 0 ?
          <div>
            {
              filteredTasks.map(task=>{
                return <TaskItem key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} onComplete={handleComplete}/>
              })
            }
          </div>
          :
          <div className='h-[200px] flex items-center justify-center  '>
            <p className='italic text-center text-gray-500'>No tasks</p>
          </div>
            
          }
        </div>
       </div>
        
      </div>
      </div>
    </>
  )
}

export default App
