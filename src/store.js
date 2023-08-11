// redux를 이용해서 state 를 보관하는 곳 -> index.js 에서 셋팅
// redux 사용 이유 -> 컴포넌트간 state 공유 편해짐 (props 필요 없음)

import { configureStore, createSlice } from "@reduxjs/toolkit";

// redux 에서 state 만드는 함수 - createSlice
let cart = createSlice({
  name: "cart",
  initialState: [
    {
      id: 0,
      name: "Side Button LongCoat",
      color: "beige",
      size: "M",
      amount: 1,
      price: 149000,
    },
    {
      id: 1,
      name: "Round Tweed Jacket",
      color: "black",
      size: "M",
      amount: 1,
      price: 114000,
    },
  ],
  // 위에서 만든 state - reducer로 등록
  reducers: {
    // 장바구니의 상품 수량 + 해주는 함수
    addAmount(state, action) {
      let num = state.findIndex((a) => {
        // findIndex - array에서 사용 가능
        // a -> array 안의 자료들
        return a.id == action.payload;
        // return 뒤에 id 값을 받아와서 payload 해온 값과 일치하는지 조건식으로
        // array 안의 자료들의 아이디가 action.payload 값과 같은 것 찾음
      });
      state[num].amount++;
    },
    // 상품 detail 페이지에서 add cart 버튼 누르면 cart 배열에 넣어주는 함수
    addItem(state, action) {
      const ai = {
        id: action.payload.id,
        name: action.payload.title,
        color: action.payload.color,
        size: action.payload.size,
        amount: 1,
        price: action.payload.price,
      };
      state.push(ai);
    },
    // 상품 cart 페이지에서 delete 버튼 누르면 cart 배열에서 삭제해주는 함수
    deleteItem(state, action) {
      state.splice(action.payload, 1);
    },
  },
});
export let { addAmount, addItem, deleteItem } = cart.actions;
// redux 에서 state 수정
export default configureStore({
  reducer: {
    cart: cart.reducer,
  },
});
