import { createContext, useState } from "react";
export const UserContext = createContext(null);

// 설정한 값을 전역에서 사용할 수 있도록 만들어줌
const UserStore = (props) => {
  const [userId, setUserId] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [price, setPrice] = useState("");
  const [memberNum, setMemberNum] = useState(0);
  const [lectureNum, setLectureNum] = useState("");
  const [categoryNum, setCategoryNum] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [paymentNum, setPaymentNum] = useState("");
  const [paySubNum, setPaySubNum] = useState("");
  const [amount, setAmount] = useState("");
  const [lecNum, setLecNum] = useState("");
  const [lecName, setLecName] = useState("");
  const [info, setInfo] = useState([
    "전체보기",
    "요리",
    "베이킹",
    "공예",
    "운동"
  ]);

  return(
  <> 
  <UserContext.Provider value={{amount, setAmount ,paySubNum, setPaySubNum,paymentNum, setPaymentNum ,lectureName, setLectureName, isLogin, setIsLogin, userName, setUserName, phone, setPhone, mail, setMail, memberNum, setMemberNum, lectureNum, setLectureNum, userId, setUserId, categoryNum, setCategoryNum, info, setInfo, price, setPrice}}>
    {props.children}
  </UserContext.Provider>
  </>
  );
};

export default UserStore;