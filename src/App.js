import "./App.css";
import {
  Routes,
  Route,
  Link,
  usenAavigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Detail from "./routes/Detail.js";
import Detail_mp from "./routes/Detail_mp.js";
import About from "./routes/About.js";
import axios from "axios";
import jquery from "jquery";
import $ from "jquery";
import Topproduct from "./topproduct";
import Mainproduct from "./mainproduct";
import Cart from "./routes/Cart";

function App() {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  // sessionstorage 휘발성으로 새로고침하면 사라짐
  // localstorage 로 만드는 최근 본 상품 기능
  // 1. key : value 형태로 저장 가능
  // 2. 문자데이터 5mb 저장 가능
  // 3. 사이트 재접속해도 남아있음 - 반 영구적
  // 개발자 도구 콘솔창에 직접 입력 명령 가능 - localStorage.setItem('age','20')
  // 출력도 가능 localStorage.getItem('age')
  // 삭제도 가능 localStorage.removeItem('age')
  // array / object 자료는 JSON 으로 변환하여 저장 -> 꺼낼땐 다시 array / object로 변환

  // 변수에 선언한 object 자료를 data로 넣어줄 수 있음 (json자료로 변환하여)
  // let obj = { name: "kim" };
  // localStorage.setItem("data", JSON.stringify(obj)); // json으로 변환한 obj 자료
  // let out = localStorage.getItem("data");
  // console.log(JSON.parse(out).name); // JSON -> obj/arr 변환

  let [topproduct, setTopproduct] = useState(Topproduct);
  let [mainproduct, setMainproduct] = useState(Mainproduct);
  //페이지 이동을 도와주는 함수 - useNavigate
  let navigate = useNavigate();

  // scroll에 따라 위치를 확인하여 NavBar 고정
  // $(window).scroll(() => {
  //   let height = 0;
  //   height = $(window).scrollTop();
  //   const navBar = document.querySelector(".NavbarDesign");
  //   if (height >= 99) {
  //     navBar.classList.add("scroll-fixed");
  //   } else navBar.classList.remove("scroll-fixed");
  // });

  return (
    <div className="App">
      <script src="http://code.jquery.com/jquery-3.3.1min.js"></script>
      <div className="header">
        <Navbar className="NavBarDesign">
          <Container className="ContainerFont">
            <Navbar.Brand
              className="Brand"
              href="#home"
              onClick={() => {
                navigate("/");
              }}
            >
              Mio{" "}
            </Navbar.Brand>
            <Nav className="nav-menu">
              <Nav.Link
                onClick={() => {
                  navigate("/about");
                }}
              >
                about
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/outer");
                }}
              >
                outer
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/top");
                }}
              >
                top
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/bottom");
                }}
              >
                bottom
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/shoes");
                }}
              >
                shoes
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/acc");
                }}
              >
                acc
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }}
              >
                home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/cart");
                }}
              >
                cart
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/join");
                }}
              >
                join
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/login");
                }}
              >
                login
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <div className="body">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="Main-bg"></div>
                <h4 className="W-B"> Weekly Best </h4>
                <p></p>
                <div className="container">
                  <div className="row">
                    {topproduct.map((a, i) => {
                      return <Card topproduct={Topproduct[i]} i={i}></Card>;
                      // 위의 Card state를 -> map 반복문 함수로 작성
                    })}
                  </div>
                </div>
                <p></p>
                <h4 className="N-A"> New Arrivals </h4>
                <p></p>
                <div className="container">
                  <div className="row">
                    {mainproduct.map((a, i) => {
                      return (
                        <MainCard mainproduct={Mainproduct[i]} i={i}></MainCard>
                      );
                    })}
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/detail/tp/:id"
            element={<Detail topproduct={Topproduct} />}
          />
          <Route
            path="/detail/mp/:id"
            element={<Detail_mp mainproduct={Mainproduct} />}
          />
          <Route path="/outer" element={<div>outer페이지</div>} />
          <Route path="/top" element={<div>top페이지</div>} />
          <Route path="/bottom" element={<div>bottom페이지</div>} />
          <Route path="/shoes" element={<div>shoes페이지</div>} />
          <Route path="/acc" element={<div>acc페이지</div>} />
          {/* Route  URL 파라미터 문법 (:id) 으로 Detail 페이지 여러개 만들기*/}
          <Route path="/about" element={<About />}>
            {/* <Route path="/about/member" element={<div>멤버임</div>} />
            <Route path="/about/location" element={<div>위치임</div>} /> */}
            {/* 네스티드 라우트 문법으로 2중 라우트 - 페이지 이동, 뒤로가기 이점*/}
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/join" element={<div>회원가입페이지</div>} />
          <Route path="/login" element={<div>로그인페이지</div>} />
          <Route path="*" element={<div>404error</div>}></Route>
        </Routes>
      </div>
      <div className="ptag"></div>
      <footer>
        <h4>MiO</h4>
        <h5>Ceo : Ji Hyeong Lee</h5>
        <h5>instagram : j_h_711</h5>
        <p></p>
        <h6>contect : 01051181571</h6>
        <h6>전화 상담은 당분간 운영되지 않습니다.</h6>
        <h6>Business Number : 165-25-00965</h6>
      </footer>
    </div>
  );
}

function Card(props) {
  let navigate = useNavigate();
  return (
    <div className="col-md-4">
      <img
        onClick={() => {
          navigate("/detail/tp/" + props.i + "");
        }}
        src={process.env.PUBLIC_URL + "/img/product" + props.i + ".jpg"}
        // React (public 폴더 내의 이미지) 이미지 넣는 권장 방법
        width="100%"
        height="75%"
      />
      <h6>{props.topproduct.title}</h6>
      {/* <p>{props.mainproduct.content}</p> */}
      <p>{props.topproduct.price}</p>
    </div>
  );
}
function MainCard(props) {
  let navigate = useNavigate();
  return (
    <div className="col-md-3">
      <img
        onClick={() => {
          navigate("/detail/mp/" + props.i + "");
        }}
        src={process.env.PUBLIC_URL + "/img/mp" + props.i + ".jpg"}
        // React (public 폴더 내의 이미지) 이미지 넣는 권장 방법
        width="100%"
        height="75%"
      />
      <h6>{props.mainproduct.title}</h6>
      {/* <p>{props.mainproduct.content}</p> */}
      <p>{props.mainproduct.price}</p>
    </div>
  );
}
export default App;
