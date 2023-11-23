/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

export default function TaskItem({ index,task, onEdit, onDelete, onMarkComplete }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#2f2f2f9f] hover:bg-[#323232] px-4 py-3 rounded-md mb-2">
      
      <p style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
        {index+1}. {task.text}
      </p>
      <div className="flex space-x-4 items-center justify-end mt-2 sm:mt-0">
        {!task.isCompleted ? (
          <>
           <button
              onClick={() => onMarkComplete(task.id)}
              className="text-emerald-500 "
            >
              mark complete
            </button>
            <button onClick={() => onEdit(task)} className="text-emerald-500 ">
              edit
            </button>
           
          </>
        ) : null}

        <button onClick={() => onDelete(task)} className="text-red-300 ">
          delete
        </button>
      </div>
    </div>
  );
}
