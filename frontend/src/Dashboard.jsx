import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [totalTasks, settt] = useState(0);
  const [comp, setcomp] = useState(0);
  const [avg, setavg] = useState(0);
  const [pend, setPend] = useState(0);
  const [timeElap, settimeElap] = useState(0);
  const [timeEst, settimeEst] = useState(0);
  useEffect(() => {
    const n = localStorage.getItem("name");
    if (!n) {
      navigate("/login");
    }
  });
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getSummary/${localStorage.getItem(
          "userID"
        )}`
      );
      if (res.data.status === "None") {
        return;
      }
      settt(res.data.summary.totalTasks);
      setcomp(res.data.summary.completedPercent);
      setavg(res.data.summary.Avg);
      setPend(res.data.summaryPending.pendingTasks);
      settimeElap(res.data.summaryPending.timeElapsed);
      console.log(res.data);
      settimeEst(res.data.summaryPending.estTime);
    })();
  }, []);
  return (
    <div className="h-[100vh] w-[100vw] ">
      <NavBar />
      <div className="px-10">
        <h2 className="my-5 text-3xl font-bold">Dashboard</h2>
        <div>
          <h2 className="text-xl my-2 font-medium">Summary</h2>
          <ul className="py-3 flex">
            <li className="px-2 mr-5">
              <p className="text-center text-3xl text-purple-700 font-bold">
                {totalTasks ? totalTasks : 0}
              </p>
              <p>Total tasks</p>
            </li>
            <li className="px-2 mr-5">
              <p className="text-center text-3xl text-purple-700 font-bold">
                {comp}%
              </p>
              <p>Total completed</p>
            </li>
            <li className="px-2 mr-5">
              <p className="text-center text-3xl text-purple-700 font-bold">
                {avg} hrs
              </p>
              <p>Average time per completed task</p>
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <h2 className="text-xl my-2 font-medium">Pending task summary</h2>
          <ul className="py-3 flex">
            <li className="px-2 mr-5">
              <p className="text-center text-3xl text-purple-700 font-bold">
                {pend ? pend : 0}
              </p>
              <p>Penging tasks</p>
            </li>
            <li className="px-2 mr-5">
              <p className="text-center text-3xl text-purple-700 font-bold">
                {timeElap} hrs
              </p>
              <p>Total time lapsed</p>
            </li>
            <li className="px-2 mr-5">
              <p className="text-center text-3xl text-purple-700 font-bold">
                {timeEst ? timeEst : 0} hrs
              </p>
              <p>Total time to finish estimated based on endtime</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
