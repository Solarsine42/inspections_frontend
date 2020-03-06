import React from "react";
import { connect } from "react-redux";
import Pending from "./Pending";
import AddPending from "./AddPending";

const Pendings = props => {
  // const [search, setSearch] = useState("");
  const pendingInspections = props.pendings
    .filter(inspection =>
      String(inspection.member_number).includes(props.mbrSearch)
    )
    .map((inspection, i) => <Pending key={i} pending={inspection} />);

  return (
    <div style={{ marginLeft: "5%" }}>
      <br />
      <AddPending />
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
