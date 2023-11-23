/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

export default function TaskItem({task,onEdit,onDelete,onComplete}){
    return (
        <div className='flex items-center justify-between bg-[#393939] px-4 py-2 rounded-md mb-2'>
            <p>{task.id}. {task.text}</p>
            <div className='flex space-x-4 items-center'>
            {
                !task.isCompleted ? <button onClick={()=>onComplete(task)} className='text-emerald-500 '>mark complete</button> :null
            }
            
            <button onClick={()=>onEdit(task)} className='text-emerald-500 '>edit</button>
            <button onClick={()=>onDelete(task)} className='text-red-300 '>delete</button>
            </div>
           
        </div>
    )
}