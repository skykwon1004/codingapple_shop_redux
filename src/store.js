import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

// const user = createSlice({
//   name: "user",
//   initialState: { name: "kim", age: 20 },

//   // 바꾸고 싶은 함수를 만든다
//   reducers: {
//     changeName(state) {
//       state.name = "park";
//     },
//     addAge(state, action) {
//       state.age = state.age + action.payload;
//     },
//   },
// });

// reducers에 만든 함수를 빼서 쓸려면 밑에 처럼 등록?하고  export 해준다
// export const { changeName, addAge } = user.actions;

const stock = createSlice({
  name: "stock",
  initialState: [1200, 30, 40],
});

const cartData = createSlice({
  name: "cartData",
  initialState: [
    { id: 15488, name: "White and Black", count: 2 },
    { id: 24445, name: "Grey Yordan", count: 1 },
  ],

  reducers: {
    addCount(state, action) {
      const IdNumber = action.payload;
      const itemIndex = state.findIndex((item) => item.id == IdNumber);
      state[itemIndex].count += 1;
    },

    removeCount(state, action) {
      const IdNumber = action.payload;
      const itemIndex = state.findIndex((item) => item.id == IdNumber);
     
      // 먼저 현재 아이템의 count 값을 가져옴
      const currentCount = state[itemIndex].count;
      console.log(currentCount)

      // count가 0 미만이면 연산을 수행하지 않음
      if (currentCount > 0) {
        state[itemIndex].count -= 1;
      } else {
        alert("더 이상 삭제 할 수 없습니다.");
      }
    },

    order(state, action) {
      //const copy = [...state]
      //console.log(copy)
      const r = action.payload;
      state.push(action.payload);
      console.log(r);
    },
  },
});

export const { addCount, order, removeCount } = cartData.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cartData: cartData.reducer,
  },
});
