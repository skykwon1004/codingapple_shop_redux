import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, addAge } from "./../store/userSlice";
import { addCount,removeCount } from "../store";

const Cart = () => {
  const state = useSelector((state) => {
    return state;
  });
  //console.log(state);

  const cartData = useSelector((state) => state.cartData);
  //console.log(cartData);

  const dispatch = useDispatch();

  return (
    <div>
      {state.user.name}의 장바구니 <p>나의 나이 : {state.user.age}</p>
      <button
        onClick={() => {
          dispatch(addAge(10));
        }}
      >
       이거 누르면 나이 빨리 머금
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        {cartData.map((it, idx) => {
          return (
            <tbody key={it.id}>
              <tr>
                <td>{cartData[idx].id}</td>
                <td>{cartData[idx].name}</td>
                <td>{cartData[idx].count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(addCount(cartData[idx].id));
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch(removeCount(cartData[idx].id));
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default Cart;
