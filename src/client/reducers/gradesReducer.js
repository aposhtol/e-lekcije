import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { name: '1. razred', type: 'elem', grade: 1 },
  { name: '2. razred', type: 'elem', grade: 2 },
  { name: '3. razred', type: 'elem', grade: 3 },
  { name: '4. razred', type: 'elem', grade: 4 },
  { name: '5. razred', type: 'elem', grade: 5 },
  { name: '6. razred', type: 'elem', grade: 6 },
  { name: '7. razred', type: 'elem', grade: 7 },
  { name: '8. razred', type: 'elem', grade: 8 },
  { name: '1. razred', type: 'high', grade: 1 },
  { name: '2. razred', type: 'high', grade: 2 },
  { name: '3. razred', type: 'high', grade: 3 },
  { name: '4. razred', type: 'high', grade: 4 },
];

const gradesReducer = createSlice({
  name: 'grades',
  initialState,

  reducers: {
    setGrade(_, action) {
      return action.payload;
    },
    reset(state, action) {
      return initialState;
    },
  },
});

export const selectGrade = (grade) => {
  return (dispatch) => {
    dispatch(setGrade(grade));
  };
};

export const resetGrades = () => {
  return (dispatch) => {
    dispatch(reset());
  };
};

//export const gradesCopy = (state) => [...state.grades];
export const { setGrade, reset } = gradesReducer.actions;
export default gradesReducer.reducer;
