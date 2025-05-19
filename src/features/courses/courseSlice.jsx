import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
};

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
      state.loading = false;
      state.error = null;
    },
    addCourse: (state, action) => {
      state.courses.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  setCurrentCourse,
  setLoading,
  setError,
} = courseSlice.actions;

export default courseSlice.reducer; 