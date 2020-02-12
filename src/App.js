import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAddresses());
    this.props.dispatch(getUWReviews());
    this.props.dispatch(getPending());
    this.props.dispatch(getArchived());
  }
  render() {
    return (
      <div className="App">
        <p>this is the app level</p>
        <main>
          <Navi />
          <br />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/pending" component={Pending} />
            <Route path="/uwreviews" component={UWReviews} />
            <Route path="/archived" component={Archived} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default connect()(App);
