import axios from "axios";
import Edit from "./Edit";

function Task({ setTasks, task }) {
  async function deleteTask() {
    setTasks((tasks) => {
      return tasks.filter((t) => {
        console.log(t._id == task._id);
        return t._id !== task._id;
      });
    });
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/deleteTask/${localStorage.getItem(
          "userID"
        )}`,
        { taskid: task._id }
      );
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="border-2  w-[17rem] mr-[1rem] mb-5 rounded flex flex-col">
      <div className="p-5 pb-0  px-5 flex flex-col justify-between">
        <p className="text-gray-600 text-sm">
          Task ID:
          <br />
          {task._id}
        </p>
        <h2 className="text-xl text-violet-900 font-medium py-1">
          {task.title}
        </h2>
        <div className="flex justify-between pt-2 items-center">
          <p
            className={`border p-2 px-4 rounded-full ${
              task.status
                ? "text-green-700 border-green-700"
                : "text-red-700 border-red-700"
            } text-sm`}
          >
            {task.status ? "Finished" : "Pending"}
          </p>
          <p className="text-sm">Priority: {task.priority}</p>
        </div>
        <div className="flex justify-between py-5 pb-7">
          <div>
            <p className="text-gray-900 font-medium">Start</p>
            <p className="text-gray-600">{task.startTime?.substring(0, 10)}</p>
            <p className="text-gray-600">{task.startTime?.substring(11, 16)}</p>
          </div>
          <div>
            <p className="text-gray-900 font-medium">End</p>
            <p className="text-gray-600">{task.endTime?.substring(0, 10)}</p>
            <p className="text-gray-600">{task.endTime?.substring(11, 16)}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-around py-5 border bg-gray-200">
        <Edit task={task} setTasks={setTasks} />
        <button className="underline text-red-700" onClick={deleteTask}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Task;
