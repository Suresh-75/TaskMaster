import { Button, ChevronDownIcon, DropdownMenu } from "@radix-ui/themes";
import axios from "axios";

function Status({ setTasks }) {
  async function statusSet(val) {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/getTasks/${localStorage.getItem(
        "userID"
      )}`
    );
    setTasks(res.data.taskObj);
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => {
        return task.status === val;
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
            Status
            <ChevronDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => statusSet(false)}>
            Pending
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => statusSet(true)}>
            Finished
          </DropdownMenu.Item>
          <DropdownMenu.Item color="red" onClick={reset}>
            Remove
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

export default Status;
