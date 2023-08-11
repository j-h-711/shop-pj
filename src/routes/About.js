import { Outlet } from "react-router-dom";

function About() {
  return (
    <div className="container">
      <div className="aboutPhoto">
        <img src="img/aboutphoto.jpg" alt="aboutphoto" width="80%" />
      </div>
      <div className="aboutContent">
        <h4>미니멀오피스 , Mio 입니다.</h4>
        <h4> ㅡ </h4>
        <p>모던하고 미니멀한 맛을 추구합니다.</p>
        <p>저렴한 가격에 하이퀄리티 의류를 제공합니다.</p>
        <p>C/S 10:00 to 17:00</p>
        {/* 네스티드 라우트 문법 안에 있는 것을 보여주는 자리 - 여러 유사한 페이지 필요할 때 사용 */}
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default About;
