import { createStore, combineReducers, applyMiddleware } from "redux";
import pendingReducer from "../store/pending/reducer";
import uwReviewsReducer from "../store/uwReviews/reducer";
import archivedReducer from "../store/archived/reducer";
import addressesReducer from "../store/addresses/reducer";
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
