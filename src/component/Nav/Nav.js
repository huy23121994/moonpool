import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {

  return (
    <div className="nav">
      <NavLink to="/token">Moon Token</NavLink>
      <NavLink to="/stake">KNC Stake</NavLink>
    </div>
  )
}

export default Nav;
