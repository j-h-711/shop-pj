import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import App from "../App.js";
import Topproduct from "../topproduct.js";
import { addItem } from "../store.js";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { event } from "jquery";

function Detail(props) {
  let [alert, setAlert] = useState(true);
  //현재 URL의 파라미터 정보 가져옴
  let { id } = useParams();

  // 현재 상품
  let nowproduct = props.topproduct.find((x) => x.id == id);

  let dispatch = useDispatch();
  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
      // useEffect 실행 전에 실행되는 코드 (clean up function)
    };
  }, []);
  // [] 를 넣으면 update 될때마다가 아닌 mount시에만 실행돼서 효율적
  // useEffect - html 랜더링이 모두 완료된 이후 실행됨
  // html 을 사용자에게 먼저 다 보여준 후 복잡한 작업을 진행해서 유용함
  // 서버에서 데이터를 가져오는 작업들이나 타이머에 사용됨

  // 최근 본 페이지 기능
  // 봤던 페이지 기록 남기기 위한 코드
  useEffect(() => {
    // 꺼낸 자료
    let outid = localStorage.getItem("watched");
    // json을 통해 배열형태로 다시 꺼냄
    outid = JSON.parse(outid);
    // 배열 형태에 넣어줌
    outid.push("tp/" + nowproduct.id);
    // array 에서 중복 제거 -> array자료형 - set자료형(중복혀용 x) - array자료형
    // set 자료형으로 변환하여 자동으로 중복 제거
    outid = new Set(outid);
    // 다시 array 자료형으로 바꿔줌
    outid = Array.from(outid);
    // 다시 localstorage에 넣어줌
    localStorage.setItem("watched", JSON.stringify(outid));
  });

  let [tab, setTab] = useState(0);
  return (
    <div className="container">
      {/* {alert == true ? (
        <div className="alert warning">2초 이내 구매시 할인</div>
      ) : null} */}
      <div className="ptag"></div>
      <div className="row">
        <div className="col-md-6">
          <img
            src={process.env.PUBLIC_URL + "/img/product" + id + ".jpg"}
            alt={"상품" + id}
            width="80%"
          />
        </div>
        <div className="col-md-6 mt-5">
          <h4 className="pt-5">{props.topproduct[id].title}</h4>
          <p></p>
          <p>{props.topproduct[id].content}</p>
          <p>{props.topproduct[id].price}원</p>
          <p></p>
          <form>
            color :{" "}
            <select name="color" className="colorBox">
              {props.topproduct.map((a, i) => (
                <option value={i}>{props.topproduct[id].color[i]}</option>
              ))}
              ,
              {/* <option value="1">{props.topproduct[id].color[0]}</option>
              <option value="2">{props.topproduct[id].color[1]}</option>
              <option value="3">{props.topproduct[id].color[2]}</option> */}
            </select>
          </form>
          <p></p>
          <form>
            size :{" "}
            <select name="size" className="sizeBox">
              {props.topproduct.map((a, i) => (
                <option value={i}>{props.topproduct[id].size[i]}</option>
              ))}
              {/* <option value="1">{props.topproduct[id].size[0]}</option>
              <option value="2">{props.topproduct[id].size[1]}</option>
              <option value="3">{props.topproduct[id].size[2]}</option> */}
            </select>
          </form>
          <p></p>
          <div className="col&size">
            {/* 구매버튼 */}
            <button className="btn btn-secondary">buying</button>
            {/* 장바구니 버튼 */}
            <button
              className="btn btn-dark"
              onClick={(i) => {
                let selectColor = document.getElementsByClassName("colorBox");
                let s_color = selectColor.value;
                let color_name = props.topproduct[id].color[s_color];
                // let selectColor = props.topproduct[id].size[i];
                let selectSize = document.getElementsByClassName("sizeBox");
                let s_size = selectSize.value;
                let size_name = props.topproduct[id].size[s_size];
                // let selectSize = props.topproduct[id].size[i];
                let addid = props.topproduct[id].id;
                let addname = props.topproduct[id].title;
                let addprice = props.topproduct[id].price;

                // 현재 size와 color값을 제대로 받아오지 못함
                dispatch(
                  addItem({
                    id: addid,
                    name: addname,
                    color: color_name,
                    size: size_name,
                    amount: 1,
                    price: addprice,
                  })
                );
              }}
            >
              add cart
            </button>
          </div>
        </div>
        <div className="ptag"></div>
      </div>
      <p></p>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(0);
            }}
            eventKey="link0"
          >
            photo
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            size
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            A/S
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent topproduct={props.topproduct} tab={tab} />
    </div>
  );
}
function getColorOption() {
  let colorOption = document.getElementsByTagName("option");
  if (colorOption != null && colorOption.length > 0) {
    var optionCount = colorOption.length;
    for (var i = 0; i < optionCount; i++) {
      if (colorOption[i].selected) {
        return colorOption[i].innerText + "";
      }
    }
  }
}
function TabContent({ tab, topproduct }) {
  let { id } = useParams();
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("endani");
    }, 150);
    return () => {
      setFade("");
    };
  }, [tab]);
  // tab이라는 state가 변경될 때 마다 안에 있는 코드 실행
  return (
    <div className={`startani ${fade}`}>
      {
        [
          <div>
            <p></p>
            {topproduct[id].content}
          </div>,
          <div>
            <p></p>
            {topproduct[id].size}
          </div>,
          <div>
            <p></p>
            {topproduct[id].as}
          </div>,
        ][tab]
      }
    </div>
  );
}

export default Detail;
