import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  courses: [],
  instructors: [],
  masterclasses: [],
  categories: [],
  loading: false,
  error: null,
};

export const adminDashboard = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      state.users = action.payload.users || [];
      state.courses = action.payload.courses || [];
      state.instructors = action.payload.instructors || [];
      state.masterclasses = action.payload.masterclasses || [];
      state.categories = action.payload.categories || [];
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearDashboardData: (state) => {
      state.users = [];
      state.courses = [];
      state.instructors = [];
      state.masterclasses = [];
      state.categories = [];
      state.loading = false;
      state.error = null;
    },
    // Optimistic updates for delete operations
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
    deleteInstructor: (state, action) => {
      state.instructors = state.instructors.filter(
        (instructor) => instructor.id !== action.payload
      );
    },
    deleteMasterclass: (state, action) => {
      state.masterclasses = state.masterclasses.filter(
        (masterclass) => masterclass.id !== action.payload
      );
    },

    deleteItem: (state, action) => {
      const { key, id } = action.payload;
      state[key] = state[key].filter((item) => item.id !== id);
    },
  },
});

export const {
  setDashboardData,
  setLoading,
  setError,
  clearDashboardData,
  deleteUser,
  deleteCourse,
  deleteInstructor,
  deleteMasterclass,
  deleteItem,
} = adminDashboard.actions;

export default adminDashboard.reducer;
