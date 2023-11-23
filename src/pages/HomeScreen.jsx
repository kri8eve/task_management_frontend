/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import TaskItem from "../components/TaskItem";
import NavBar from "../components/NavBar";

const baseUrl = "http://localhost:9999";

function HomeScreen() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setselectedTask] = useState(null);
  const [completedFilter, setCompletedFilter] = useState(0);


  function cancel(e){
    e.preventDefault()
     setText('');
    setselectedTask(null)
  }

  function handleEdit(task) {
    setText(task.text);
    setselectedTask(task);
  }

  async function handleDelete(task) {
    try {
      const resp = await fetch(`http://localhost:9999/api/task/${task.id}`, {
        method: "DELETE",
        withCredentials: true
      });
      const data = await resp.json();
      if (resp.status === 200) {
        getTask();
      }
    } catch (err) {
      alert(err);
    }
  }
  async function handleMarkComplete(taskId) {
    try {
      const resp = await fetch(`http://localhost:9999/api/task/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-type": "Application/json",
        },
        
        body: JSON.stringify({isCompleted: true }),
        withCredentials: true
      });
      const data = await resp.json();
      if (resp.status === 200) {
        getTask();
      }
    } catch (err) {
      alert(err);
    }
  }

  async function addTask(e) {
    e.preventDefault();
    try {
      if (!text || text == "") {
        throw new Error("Task must not be empty");
      }
      const resp = await fetch("http://localhost:9999/api/task", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({ text }),
        withCredentials: true
      });
      const data = await resp.json();
      if (resp.status === 200) {
        setText("");
        setTasks((prev) => [...prev, data.task]);
      }
    } catch (err) {
      alert(err);
    }
  }

  async function editTask(e) {
    e.preventDefault();
    try {
      if (!text || text == "") {
        throw new Error("Task must not be empty");
      }
      const resp = await fetch(
        `http://localhost:9999/api/task/${selectedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({ ...selectedTask, text }),
          withCredentials: true
        }
      );
      const data = await resp.json();
      if (resp.status === 200) {
        setText("");
        getTask();
        setselectedTask(null);
      }
    } catch (err) {
      alert(err);
    }
  }

  async function getTask() {
    try {
      const resp = await fetch("http://localhost:9999/api/task");
      const data = await resp.json();
      if (resp.status === 200) {
        setTasks(data);
      }
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    getTask();
  }, []);
  useEffect(() => {
    switch (completedFilter) {
      case 0:
        setFilteredTasks(tasks);
        break;
      case 1:
        setFilteredTasks(tasks.filter((t) => !t.isCompleted));
        break;
      case 2:
        setFilteredTasks(tasks.filter((t) => t.isCompleted));
        break;

      default:
        break;
    }
  }, [completedFilter, tasks]);


  
  return (
    <>
      <div className="sm:w-[85%] w-[90%] mx-auto ">
       <NavBar/>
        
        <div className='text-xs'>
          <div className="mb-6 bg-[#2f2f2f9f] p-4 rounded-md">
            <form onSubmit={addTask} className="w-full ">
              <input
                type="text"
                placeholder="Enter Task"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="rounded-md  flex-1 w-full px-4 py-2  text-[#ddd] bg-[#3C3C3C9F] ring-1 ring-[#5454549f] outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <div className="flex items-center justify-end mt-2">
              {selectedTask ? (
                <div className="flex items-center">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white  rounded-md  ring-emerald-500"
                  type="submit"
                  onClick={editTask}
                >
                  Update
                </button>
                <button
                  className="px-4 py-2  text-gray-500 "
                  type="submit"
                  onClick={cancel}
                >
                  Cancel
                </button>
                </div>
                
              ) : (
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded-md "
                  type="submit"
                  onClick={addTask}
                >
                  Add
                </button>
              )}
              </div>
              
            </form>
          </div>
          <div >
            <div className="py-4 flex items-center justify-between">
              <p>All tasks</p>
              <div className="flex items-center space-x-4">
                <button
                  type=""
                  onClick={() => setCompletedFilter(0)}
                  style={{
                    color: completedFilter === 0 ? "#2FF4A2" : "#959595",
                  }}
                >
                  All
                </button>
                <button
                  type=""
                  onClick={() => setCompletedFilter(1)}
                  style={{
                    color: completedFilter === 1 ? "#2FF4A2" : "#959595",
                  }}
                >
                  Not Completed
                </button>
                <button
                  type=""
                  onClick={() => setCompletedFilter(2)}
                  style={{
                    color: completedFilter === 2 ? "#2FF4A2" : "#959595",
                  }}
                >
                  Completed
                </button>
               
              </div>
            </div>
            <div>
              {filteredTasks.length > 0 ? (
                <div>
                  {filteredTasks.map((task,i) => {
                    return (
                      <TaskItem
                        key={i}
                        index={i}
                        task={task}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onMarkComplete={handleMarkComplete}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center  ">
                  <p className="italic text-center text-gray-500">No tasks</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
