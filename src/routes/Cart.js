import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addAmount, deleteItem } from "../store.js";

function Cart() {
  // Redux store에 있던 모든 state가 남음 - 형태 계속 똑같이 사용
  // return 값에 있는 state를 state.user로 바꾸면 user state만 가져다 씀
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  return (
    <div className="CartTable">
      <p></p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>item</th>
            <th>color</th>
            <th>size</th>
            <th>amount</th>
            <th>price</th>
            <th>add</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            // 반복문으로 cart 내의 상품 갯수만큼 <tr> 만들어 줌
            <tr key={i}>
              <td>{state.cart[i].id}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].color}</td>
              <td>{state.cart[i].size}</td>
              <td>{state.cart[i].amount}</td>
              <td>{state.cart[i].price}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(addAmount(state.cart[i].id));
                    // store.js의 addAmount 사용해서 장바구니에 amount +1 해줌
                  }}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    dispatch(deleteItem(state.cart[i].id));
                    // store.js의 deleteItem 사용해서 장바구니에 삭제해줌
                  }}
                >
                  비우기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p></p>
      <button>buying now</button>
    </div>
  );
}

export default Cart;
