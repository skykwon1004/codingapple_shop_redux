import React, { useState } from "react";
import Item from "./Item";
import axios from "axios";

const Main = ({ shoes, setShoes }) => {
  const [click, setClick] = useState(2);

  const [load, setLoad] = useState(false); // 로드 상태를 초기에 false로 설정합니다.

  const handleClick = () => {
    setClick(click + 1);
    console.log(click);

    setLoad(true); // 데이터를 가져오는 동안 로드 상태를 true로 설정합니다.

    // 데이터 가져오기 전
    axios
      .get(`https://codingapple1.github.io/shop/data${click}.json`)
      .then((r) => {
        //console.log(r.data);
        const moreItem = r.data;
        // const copy = [...shoes, ...moreItem];
        const copy = [...shoes];
        const result = copy.concat(moreItem);

        setShoes(result);
        console.log(result);
        setLoad(false); // 데이터를 로드한 후 로드 상태를 다시 false로 설정합니다.
      })

      // 데이터를 가져오지 못했을 때 catch
      .catch(() => {
        console.log("데이터 가져오기 실패");
        setLoad(false); // 오류 발생 시 로드 상태를 다시 false로 설정합니다.
      });


    // axios로 데이터를 가져오면 axios가 json 으로 변환해줌 그런데
    //fetch는 json -> array/object 변환과정이 필요해서 직접 적어 줘야함
    // fetch("https://codingapple1.github.io/shop/data3.json")
    //   .then(r => r.json())
    //   .then(data => {});
  };

  
  const renderBtn =
    click < 4 ? (
      <button
        onClick={() => {
          handleClick();
        }}
      >
        More
      </button>
    ) : null;

  return (
    <>
      <div className="main-bg"></div>

      {/* 상품 아이템 */}
      <div className="container">
        <div className="row">
          <Item shoes={shoes} setShoes={setShoes} />
        </div>
      </div>

      {renderBtn}

      {/* 로딩 UI에 대한 조건부 렌더링 */}
      {/* load의 값이 true일때 로딩 중... 화면을
      데이터 가져오는 중에는 true여서 화면 구현된다.
      */}
      {load && <div>로딩 중...</div>}
    </>
  );
};

export default Main;
