import { Outlet, useLocation } from "react-router-dom";

import Home from "./home";

export default function Root() {
  const location = useLocation();

  return <>{location.pathname === "/" ? <Home /> : <Outlet />}</>;
}
