import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
function Priority({ setTasks }) {
  async function sortTasksByPriority(val) {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/getTasks/${localStorage.getItem(
        "userID"
      )}`
    );
    setTasks(res.data.taskObj);
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => {
        return task.priority === val;
      });
    });
  }
  async function reset() {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/getTasks/${localStorage.getItem(
        "userID"
      )}`
    );
    setTasks(res.data.taskObj);
  }
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button
            color="gray"
            style={{ borderRadius: "2rem" }}
            variant="surface"
          >
            Priority
            <ChevronDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => sortTasksByPriority("1")}>
            1
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => sortTasksByPriority("2")}>
            2
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => sortTasksByPriority("3")}>
            3
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => sortTasksByPriority("4")}>
            4
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => sortTasksByPriority("5")}>
            {" "}
            5
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => reset()} color="red">
            Remove
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

export default Priority;
