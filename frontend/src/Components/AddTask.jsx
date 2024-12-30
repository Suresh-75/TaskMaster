import {
  Button,
  ChevronDownIcon,
  Dialog,
  DropdownMenu,
  Flex,
} from "@radix-ui/themes";
import DatePickerc from "./DatePickerc";
import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
function AddTask({ setTasks, tasks }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(5);
  const [startTime, setStartTime] = useState(dayjs("2022-04-17T15:30"));
  const [endTime, setEndTime] = useState(dayjs("2022-04-17T15:30"));
  const [status, setStatus] = useState(false);

  async function handleAddTask() {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/addTask`, {
        title,
        priority,
        startTime,
        endTime,
        status,
        userID: localStorage.getItem("userID"),
      });
      setTasks((tasks) => [...tasks, res.data.task]);
      console.log(res.tasks);
      console.log("jhere");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog.Root modal={false}>
      <Dialog.Trigger>
        <button className="border-2 p-2 px-4 rounded-md text-violet-800">
          <span className="mr-2">+</span> Add task
        </button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add new task</Dialog.Title>
        <div className="flex flex-col">
          <label htmlFor="title" className="font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="border-2 rounded p-1 px-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex w-[100%] my-4 mb-0">
          <div className="flex flex-col w-[50%]">
            <label htmlFor="Priority" className="font-medium">
              Priority
            </label>
            <div>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button color="gray" variant="surface">
                    <span className="mr-7">{priority}</span>
                    <ChevronDownIcon />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item onClick={() => setPriority(1)}>
                    1
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setPriority(2)}>
                    2
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setPriority(3)}>
                    3
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setPriority(4)}>
                    4
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setPriority(5)}>
                    5
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </div>
          <div className="flex flex-col w-[50%]">
            <label htmlFor="status" className="font-medium">
              Status
            </label>
            <span>
              <label className="inline-flex items-center mb-5 cursor-pointer">
                <span className="mr-3 text-sm text-gray-900 dark:text-gray-300">
                  Pending
                </span>
                <input
                  type="checkbox"
                  value={status}
                  className="sr-only peer"
                  onClick={() => setStatus(!status)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none   dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm text-gray-900 dark:text-gray-300">
                  Finished
                </span>
              </label>
            </span>
          </div>
        </div>
        <div className="flex  w-[100%] mb-6">
          <DatePickerc start={true} time={startTime} set={setStartTime} />
          <DatePickerc start={false} time={endTime} set={setEndTime} />
        </div>
        <Flex gap="3" mt="4" justify="start">
          <Dialog.Close>
            <Button onClick={handleAddTask} color="purple">
              Add task
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default AddTask;
