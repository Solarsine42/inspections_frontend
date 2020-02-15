import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getAddresses } from "./store/addresses/actions";
import { getUWReviews } from "./store/uwReviews/actions";
import { getPendings } from "./store/pending/actions";
import { getArchives } from "./store/archived/actions";
import Navi from "./components/utility/Navi";
import Home from "./components/utility/Home";
import Pendings from "./components/pending/Pendings";
import UWReviews from "./components/uwReviews/UWReviews";
import Archived from "./components/archived/Archives";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAddresses());
    this.props.dispatch(getUWReviews());
    this.props.dispatch(getPendings());
    this.props.dispatch(getArchives());
  }
  render() {
    return (
      <div className="App">
        <main>
          <Navi />
          <br />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/pending" component={Pendings} />
            <Route path="/uwreviews" component={UWReviews} />
            <Route path="/archived" component={Archived} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default connect()(App);
