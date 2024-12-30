import NavBar from "./Components/NavBar";
import Sort from "./Components/Sort";
import Priority from "./Components/Priority";
import Status from "./Components/Status";
import Task from "./Components/Task";
import AddTask from "./Components/AddTask";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
function Tasklist() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getTasks/${localStorage.getItem(
          "userID"
        )}`
      );
      setTasks(res.data.taskObj);
    })();
  }, []);

  useEffect(() => {
    const n = localStorage.getItem("name");
    if (!n) {
      navigate("/login");
    }
  });
  return (
    <div>
      <NavBar />
      <div className="px-10">
        <h2 className="my-5 text-3xl font-bold">Task list</h2>
        <div className="flex justify-between items-center mb-5">
          <AddTask setTasks={setTasks} tasks={tasks} />
          <ul className="flex w-[20%] justify-between">
            <li>
              <Sort setTasks={setTasks} />
            </li>
            <li>
              <Priority setTasks={setTasks} />
            </li>
            <li>
              <Status setTasks={setTasks} />
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap">
          {tasks.map((task) => {
            return <Task task={task} key={task._id} setTasks={setTasks} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Tasklist;
