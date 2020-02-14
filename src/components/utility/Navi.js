import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navi = () => {
  return (
    <div>
      <p>This is the Navbar</p>
    </div>
  );
};

export default connect()(Navi);
