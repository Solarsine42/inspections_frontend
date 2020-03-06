import React from "react";
import { connect } from "react-redux";
import Pending from "./Pending";
import AddPending from "./AddPending";
import LazyLoad from "react-lazyload";

const Pendings = props => {
  const pendingInspections = props.pendings
    .filter(inspection =>
      String(inspection.member_number).includes(props.mbrSearch)
    )
    .map((inspection, i) => (
      <LazyLoad key={i} height={50}>
        <Pending key={i} pending={inspection} />
      </LazyLoad>
    ));

  return (
    <div style={{ marginLeft: "5%" }}>
      <br />
      <AddPending />
      <br />
      <br />
      <div>{pendingInspections}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    pendings: state.pending.all,
    mbrSearch: state.pending.searchPendingFromNav
  };
}

export default connect(mapStateToProps)(Pendings);
