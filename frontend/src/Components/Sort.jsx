import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { useState } from "react";
function Sort({ setTasks }) {
  function sortTasksByStartTime1() {
    setTasks((prevTasks) => {
      return [...prevTasks].sort((a, b) => {
        const timeA = new Date(a.startTime);
        const timeB = new Date(b.startTime);
        return timeA - timeB; // Sort by ascending start time
      });
    });
  }
  function sortTasksByStartTime2() {
    setTasks((prevTasks) => {
      return [...prevTasks].sort((a, b) => {
        const timeA = new Date(a.startTime);
        const timeB = new Date(b.startTime);
        return timeB - timeA;
      });
    });
  }
  function sortTasksBySEndTime1() {
    setTasks((prevTasks) => {
      return [...prevTasks].sort((a, b) => {
        const timeA = new Date(a.endTime);
        const timeB = new Date(b.endTime);
        return timeB - timeA;
      });
    });
  }
  function sortTasksBySEndTime2() {
    setTasks((prevTasks) => {
      return [...prevTasks].sort((a, b) => {
        const timeA = new Date(a.endTime);
        const timeB = new Date(b.endTime);
        return timeB - timeA;
      });
    });
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button color="gray" style={{ borderRadius: "2rem" }} variant="solid">
          Sort
          <CaretSortIcon width="20" height="" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={sortTasksByStartTime1}>
          Start time:ASC
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={sortTasksByStartTime2}>
          Start time:DSC
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={sortTasksBySEndTime1}>
          End time:ASC
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={sortTasksBySEndTime2}>
          End time:DSC
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red">Remove</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
export default Sort;
