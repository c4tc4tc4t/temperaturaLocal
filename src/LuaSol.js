import { getHours } from "date-fns";
import React from "react";
import Lua from "./imgs/lua.svg";
import Sol from "./imgs/sol.svg";

function LuaSol() {
  const [luaSol, setLuaSol] = React.useState(null);

  React.useEffect(() => {
    setLuaSol(() => {
      if (getHours(new Date()) >= 6 && getHours(new Date()) < 18) {
        return Sol;
      } else {
        return Lua;
      }
    });
  }, []);
  return <img className="luaSol" src={Sol} alt="luaSol"></img>;
}

export default LuaSol;
