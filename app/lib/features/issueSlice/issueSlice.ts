import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IssuesState {
  issues: Issue[];
  loading: boolean;
}

const initialState: IssuesState = {
  issues: [],
  loading: false,
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    fetchIssuesStart(state) {
      state.loading = true;
    },
    fetchIssuesSuccess(state, action: PayloadAction<Issue[]>) {
      state.issues = action.payload;
      state.loading = false;
    },
    fetchIssuesFailure(state) {
      state.loading = false;
    },
  },
});

export const { fetchIssuesStart, fetchIssuesSuccess, fetchIssuesFailure } = issuesSlice.actions;
export default issuesSlice.reducer;
