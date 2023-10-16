import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { order } from "../store";

const Btn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

const Detail = ({ shoes }) => {
  const alertBox = useRef();
  const [count, setCount] = useState(0);

  const [tab, setTab] = useState(0);

  const [num, setNum] = useState("");
  //console.log(num);

  const [comfade, setComfade] = useState("");

  const inputNum = (e) => {
    const value = e.target.value;
    // 정규 표현식을 사용하여 입력된 값이 숫자인지 확인
    const isNumeric = /^[0-9]*$/.test(value);

    if (isNumeric) {
      setNum(value);
    } else {
      // 입력된 값이 숫자가 아닐 경우 경고 창을 띄웁니다.
      alert("숫자만 입력해주세요.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setComfade("containerEnd");
    }, 100);

    return () => {
      setComfade("");
    };
  }, []);

  // useEffect는 mount(만들어지거나),update(업데이트 될 때, 재렌더링)시 코드 실행해준다
  useEffect(() => {
    // for (var i = 0; i < 10000; i++) {
    //   console.log(1);
    // }

    let time = setTimeout(() => {
      // console.log(alertBox.current);
      alertBox.current.classList.add("alert-close");
    }, 2000);
    //console.log("2초 뒤에 나는 사라짐");

    return () => {
      //console.log("2초 뒤 보다 내가 먼저 실행 ㅅㄱ");
      clearTimeout(time);
    };
  });

  // useEffect 뒤에 ,[count] 이거는 dependency --> state가 변할 때만 실행됨
  // 만약 []빈칸만 둔다면 mount 될 때 1번만 실행시킴

  const { ID } = useParams();
  //console.log(ID);

  // 방법1
  const result = shoes.find((element) => element.id == ID);
  // console.log(result);

  // 방법2
  // function isID(element) {
  //   if (element.id == ID) {
  //     return true;
  //   }
  // }
  // const IDRESULT = shoes.find(isID);
  //console.log(IDRESULT);

  const dispatch = useDispatch();

  useEffect(() => {
    let getWatchedItem = localStorage.getItem("watched");
    getWatchedItem = JSON.parse(getWatchedItem);
    getWatchedItem.push(result.id);
    getWatchedItem = new Set(getWatchedItem);
    getWatchedItem = Array.from(getWatchedItem);
    localStorage.setItem("watched", JSON.stringify(getWatchedItem));
    //console.log(getWatchedItem);
  }, []);


  return (
    <div className={`container containerStart ${comfade}`}>
      <div className="alert alert-warning" ref={alertBox}>
        2초이내 구매시 할인
      </div>
      {count}
      <Btn
        bg="blue"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </Btn>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <input type="text" value={num} onChange={inputNum} />
        <div className="col-md-6">
          <h4 className="pt-5">{result.title}</h4>
          <p>{result.content}</p>
          <p>{result.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(order({ id: result.id, name: result.title, count: 1 }));
            }}
          >
            주문하기
          </button>
        </div>
      </div>

      {/* 탭 */}
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            상세 페이지
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            배송 정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            판매자 정보
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
};

// function TabContent({ tab }) {
//   if (tab == 0) {
//     return <div>상세 페이지</div>;
//   }
//   if (tab == 1) {
//     return <div>배송 정보</div>;
//   }
//   if (tab == 2) {
//     return <div>판매자 정보</div>;
//   }
// }

function TabContent({ tab }) {
  const [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 10);

    return () => {
      setFade("");
    };
  }, [tab]);

  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default Detail;
