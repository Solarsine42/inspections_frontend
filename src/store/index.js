import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middleware = [thunk, logger];
const rootReducer = combineReducers({
  pending: pendingReducer,
  uwReviews: uwReviewsReducer,
  archived: archivedReducer,
  addresses: addressesReducer
});

export default createStore(rootReducer, applyMiddleware(...middleware));
