import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import App from "../App.js";
import Mainproduct from "../mainproduct.js";

function Detail_mp(props) {
  let [alert, setAlert] = useState(true);
  let { id } = useParams();
  //현재 URL의 파라미터 정보 가져옴

  // 현재 상품
  let mpnowproduct = props.mainproduct.find((x) => x.id == id);

  // 최근 본 페이지 기능
  // 봤던 페이지 기록 남기기 위한 코드
  useEffect(() => {
    // 꺼낸 자료
    let outid = localStorage.getItem("watched");
    // json을 통해 배열형태로 다시 꺼냄
    outid = JSON.parse(outid);
    // 배열 형태에 넣어줌
    outid.push("mp/" + mpnowproduct.id);
    // array 에서 중복 제거 -> array자료형 - set자료형(중복혀용 x) - array자료형
    // set 자료형으로 변환하여 자동으로 중복 제거
    outid = new Set(outid);
    // 다시 array 자료형으로 바꿔줌
    outid = Array.from(outid);
    // 다시 localstorage에 넣어줌
    localStorage.setItem("watched", JSON.stringify(outid));
  });

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
            src={process.env.PUBLIC_URL + "/img/mp" + id + ".jpg"}
            alt={"상품" + id}
            width="80%"
          />
        </div>
        <div className="col-md-6 mt-5">
          <h4 className="pt-5">{props.mainproduct[id].title}</h4>
          <p></p>
          <p>{props.mainproduct[id].content}</p>
          <p>{props.mainproduct[id].price}원</p>
          <p></p>
          <form>
            color :{" "}
            <select name="size" className="sizeBox">
              <option value="0">{props.mainproduct[id].color[0]}</option>
              <option value="1">{props.mainproduct[id].color[1]}</option>
              <option value="2">{props.mainproduct[id].color[2]}</option>
              <option value="3">{props.mainproduct[id].color[3]}</option>
            </select>
          </form>
          <p></p>
          <form>
            size :{" "}
            <select name="color" className="colorBox">
              <option value="1">{props.mainproduct[id].size[0]}</option>
              <option value="2">{props.mainproduct[id].size[1]}</option>
              <option value="3">{props.mainproduct[id].size[2]}</option>
            </select>
          </form>
          <p></p>
          <div className="col&size">
            <button className="btn btn-secondary">buying</button>
            {""}
            <button className="btn btn-dark">add cart</button>
          </div>
        </div>
        <div className="ptag"></div>
      </div>
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
      <TabContent mainproduct={props.mainproduct} tab={tab} />
    </div>
  );
}
function TabContent({ tab, mainproduct }) {
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
            {mainproduct[id].content}
          </div>,
          <div>
            <p></p>
            {mainproduct[id].size}
          </div>,
          <div>
            <p></p>
            {mainproduct[id].as}
          </div>,
        ][tab]
      }
    </div>
  );
}

export default Detail_mp;
