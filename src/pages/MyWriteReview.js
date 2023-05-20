import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import ImageUploader from "./ImgTest";
import MypageFooter from "./MypageFooter";
import MypageHeader from "./MypageHeader";

const BodyContainer = styled.div`
  width: 100vw;
`;

const Container = styled.div`
  background-color: #FEFDFD;
  width: 40%;
  margin: 3px auto;
  border: 1px solid lightgray;
  padding: 30px;
`;

const SectionBox1 = styled.div`
  width: 100%;
  height: 230px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Thumbnail = styled.div`
  margin: 0 auto;
  width: 200px;
  height: 150px;
  object-fit: cover;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const Category = styled.p`
  text-align: center;
  font-size: 0.7rem;
  font-weight: normal;
  margin-top: 5px;
  color: gray;
`;

const Title = styled.h3`
  text-align: center;
  font-size: .8rem;
  font-weight: bold;
  margin-top: 10px;
`;

const Section2 = styled.div`
  position: relative;
  width: 80%;
  height: 150px;
  margin: 0 auto;

  textarea {
    resize: none;
    border: 1px solid lightgray;
    border-radius: 3px;
    width: 100%;
    height: 150px;
  }
  .count {
    color: darkgray;
    font-size: 0.7em;
    position: absolute;
    right: 0;
    bottom: 5px;
  }
`;

const Write = styled.div`
  width: 80%;
  margin: 0 auto;

  button {
    width: 100%;
    height: 35px;
    font-size: .8em;
    font-weight: bold;
    background-color: #FC7373;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
      background-color: lightgray;
    }
  }

  hr {
    background-color: lightgray;
    border: .3px solid lightgray;
  }
`;

const UploadSection = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;

  .upload {
    display: none;
  }
`;


const MyWriteReview = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { userId } = context;

  const { lectureId } = useParams();

  // 글자 수 표시
  const [inputCount, setInputCount] = useState(0);
  const MAX_LENGTH = 100;

  // 후기 작성, 수정
  const [inputContext, setInputContext] = useState("");
  
  // 강의 정보
  const [lectureInfo, setlectureInfo] = useState("");
  // 회원 정보
  const [memberInfo, setMemberInfo] = useState("");

  useEffect(() => {
    const lectureInfo = async() => {
      const response = await AxiosApi.classDetailGet(lectureId);
      if(response.status === 200) setlectureInfo(response.data);
    };
    lectureInfo();
  }, [lectureId]);

  const textInput = (e) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setInputCount(e.target.value.length);
    setInputContext(e.target.value);
  };

  const changeReview = async() => {
    const rsp = await AxiosApi.memberGet(userId);
    if(rsp.status === 200) setMemberInfo(rsp.data);
    const memNum = rsp.data.length > 0 ? rsp.data[0].num.toString() : "";
    const response = await AxiosApi.writeReview(memNum, lectureId, inputContext);
    console.log(response.data);
    navigate('/MyPage', { state: { selected: "후기" } });
  };

  return( 
    <>
    <BodyContainer>
      <Container>
      <MypageHeader />
      {lectureInfo && lectureInfo.map(lecture => (
        <SectionBox1 key={lecture.num}>
        <Thumbnail imageUrl={lecture.thum}></Thumbnail>
        <Category>{lecture.categoryName}</Category>
        <Title>{lecture.name}</Title>
        </SectionBox1>
      ))}
      <Section2>
        <textarea cols="30" rows="10" maxLength={MAX_LENGTH} onChange={textInput}></textarea>
        <div id="nowByte" class="count"><span>{inputCount.toLocaleString()}</span>/{MAX_LENGTH.toLocaleString()}자</div>
      </Section2>
      <UploadSection>
      <ImageUploader></ImageUploader>
      </UploadSection>
      <Write>
      <button onClick={changeReview}>작성하기</button>
      <hr />
      </Write>
      <div className="emptyBox"></div>
      <MypageFooter />
      </Container>
    </BodyContainer>
    </>
  )
}

export default MyWriteReview;