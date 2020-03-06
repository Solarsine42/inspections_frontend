import React from "react";
import { connect } from "react-redux";
import UWReview from "./UWReview";
import AddUWReview from "./AddUWReview";
import LazyLoad from "react-lazyload";

const UWReviews = props => {
  const uwReviewsList = props.archives
    .filter(archive => String(archive.member_number).includes(props.mbrSearch))
    .map((review, i) => (
      <LazyLoad key={i} height={50}>
        <UWReview key={i} review={review} />
      </LazyLoad>
    ));

  return (
    <div style={{ marginLeft: "5%" }}>
      <br />
      <AddUWReview />
      <br />
      <div>{uwReviewsList}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    archives: state.uwReviews.all,
    mbrSearch: state.uwReviews.searchUWReviewsFromNav
  };
}

export default connect(mapStateToProps)(UWReviews);
