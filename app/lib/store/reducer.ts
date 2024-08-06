import { combineReducers } from '@reduxjs/toolkit';
import issuesReducer from '../features/issueSlice/issueSlice';

const rootReducer = combineReducers({
  issues: issuesReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
