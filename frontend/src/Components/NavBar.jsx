import { Button } from "@radix-ui/themes";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("userID");
    localStorage.removeItem("jwToken");
    navigate("/login");
  }
  return (
    <nav className="flex justify-between p-5 px-10 border-2 rounded">
      <ul className="flex w-[15%] justify-between">
        <li className="font-bold text-lg">
          <NavLink
            to="/Dashboard"
            style={({ isActive }) => ({
              color: isActive ? "purple" : "black",
            })}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="font-bold text-lg">
          <NavLink
            to="/Tasklist"
            style={({ isActive }) => ({
              color: isActive ? "purple" : "black",
            })}
          >
            Task List
          </NavLink>
        </li>
      </ul>
      <Button onClick={handleLogOut} className="hover:cursor-pointer">
        SignOut
      </Button>
    </nav>
  );
}
export default NavBar;
