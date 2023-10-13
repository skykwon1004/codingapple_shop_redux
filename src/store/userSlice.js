import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: { name: "kim", age: 20 },
  
    // 바꾸고 싶은 함수를 만든다
    reducers: {
      changeName(state) {
        state.name = "park";
      },
      addAge(state, action) {
        state.age = state.age + action.payload;
      },
    },
  });

  export const { changeName, addAge } = user.actions;

  export default user;