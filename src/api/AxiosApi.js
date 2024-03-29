import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 로그인
  memberLogin: async(id, pw) => {
    const login = {
      id : id,
      pwd : pw
    };
    return await axios.post(KH_DOMAIN + "/login", login);
  },
  // 회원 조회
  memberGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/member?id=${id}`); // 리퀘스트 파라미터 키와 밸류
  },
   // 회원 조회
   myInfoGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myInfo?id=${id}`); // 리퀘스트 파라미터 키와 밸류
  },
  // 회원 가입 여부 확인
  memberRegCheck : async(id) => {
    return await axios.get(KH_DOMAIN + `/check?id=${id}`);
  },
  // 회원 가입
  memberReg: async(name, email, tel, id, pwd, isTeacher) => {
  const member = {
      name: name,
      mail: email,
      tel : tel,
      id : id,
      pwd: pwd,
      isTeacher : isTeacher
  };
  return await axios.post(KH_DOMAIN + "/new", member);
  },
  // 전화번호 수정
  updateTel: async(id, tel) => {
    const updateT = {
      id : id,
      tel : tel
    };
    return await axios.post(KH_DOMAIN + "/updateTel", updateT);
  },
  // 전화번호 수정 중복값 체크
  telRegCheck : async(tel) => {
    return await axios.get(KH_DOMAIN + `/telCheck?tel=${tel}`)
  },
  // 이메일 수정
  updateMail: async(id, mail) => {
    const updateM = {
      id : id,
      mail : mail
    };
    return await axios.post(KH_DOMAIN + "/updateMail", updateM);
  },
  // 이메일 수정 중복값 체크
  mailRegCheck : async(mail) => {
    return await axios.get(KH_DOMAIN + `/mailCheck?mail=${mail}`);
  },
  // 회원 탈퇴
  deleteMem: async(userId) => {
    const del = {
      id : userId
    }
    return await axios.post(KH_DOMAIN + "/del", del);
  },
  // 내 구독권 조회
  mySubsGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/mySubs?id=${id}`);
  },
  // 내 수강 중 클래스 조회
  myClassGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myClass?id=${id}`);
  },
  // 내 위시리스트 조회
  myWishGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myWish?id=${id}`);
  },
  // 위시리스트 삭제
  deleteWish: async(num, wishNum) => {
    const del = {
      num : num,
      wishNum : wishNum
    }
    return await axios.post(KH_DOMAIN + "/delWish", del);
  },
  // 작성 후기 조회
  myReviewGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myReview?id=${id}`);
  },
  // 작성 가능한 후기 조회
  myWriteGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myWritable?id=${id}`);
  },
  // 강의 정보 조회
  classDetailGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/classDetail?id=${id}`);
  },
  // 후기 작성
  writeReview: async(memNum, lecNum, content, url) => {
    const write = {
      memNum: memNum,
      lecNum: lecNum,
      content: content,
      url: url
    }
    return await axios.post(KH_DOMAIN + "/writeReview", write);
  },
  // 후기 수정(전체 수정)
  updateReview: async(num, content, url) => {
    const write = {
      num: num,
      content : content,
      url: url
    }
    return await axios.post(KH_DOMAIN + "/updateReview", write);
  },
  // 후기 수정(이미지 삭제)
  deleteReviewImg: async(num, url) => {
    const write = {
      num: num,
      url: url
    }
    return await axios.post(KH_DOMAIN + "/deleteReviewImg", write);
  },
  // 후기 수정(내용 수정)
  updateReviewContent: async(num, content) => {
    const write = {
      num: num,
      content: content
    }
    return await axios.post(KH_DOMAIN + "/updateReviewContent", write);
  },
  // 후기 삭제
  deleteReview: async(num) => {
    const del = {
      num: num
    }
    return await axios.post(KH_DOMAIN + "/delReview", del);
  },
  deleteMyReview: async(num) => {
    return await axios.post(KH_DOMAIN + "/class/delReview", num);
  },
  // 이미지 업로드(강의 썸네일 업데이트)
  updateImg: async(url) => {
    const update = {
      img: url
    }
    return await axios.post(KH_DOMAIN + "/updateImg", update);
  },
  // 내 결제 내역 조회
  paymentGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myPayment?id=${id}`);
  },
  // 내 장바구니 내역 조회
  myCartGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/myCart?id=${id}`);
  },
  // 장바구니 삭제
  deleteCart: async(items) => {
    const del = {
      items: items
    }
    return await axios.post(KH_DOMAIN + "/delCart", del);
  },
   // 수강생 내역 조회
   studentGet: async(name) => {
    return await axios.get(KH_DOMAIN + `/myStudent?name=${name}`);
  },
   // 검색 : 전체 강의 조회
   lectureGet : async(num) => {
    return await axios.get(KH_DOMAIN + `/lecture?num=${num}`);
  },
  // 베이킹 강의 조회
  bakingGet : async(num) => {
    return await axios.get(KH_DOMAIN + `/baking?num=${num}`);
  },
  // 좋아요 순으로 강의 조회
  likeCountGet : async(num) => {
      return await axios.get(KH_DOMAIN + `/sidebar?num=${num}`);
  },
  // 좋아요 낮은 순 3개
  downCountGet : async(num) => {
      return await axios.get(KH_DOMAIN + `/down?num=${num}`);
  },
  // 아이디 찾기
  lostIdGet : async(name, mail) => {
    const findId = {
        name : name,
        mail : mail
    }
    return await axios.post(KH_DOMAIN + `/lostId`, findId);
  },
  // 비밀번호 찾기
  lostPwGet : async(name, id, mail) => {
      const findPw = {
          name : name,
          id : id,
          mail : mail
          
      }
      return await axios.post(KH_DOMAIN + `/lostPw`, findPw);
  },
  
  // // 카테고리 전부 불러오기
  // loadAll: async() => {
  //   return await axios.get(KH_DOMAIN + `/category`);
  // },

  // 카테고리 별 강의 리스트 불러오기
  loadList: async(categoryNum) => {
    return await axios.get(KH_DOMAIN + `/category/details?categoryNum=${categoryNum}`);
  },

  // 강의 상세 설명 페이지
  viewLecture: async(lectureNum) => {
    console.log("viewLecture axios 호출" + lectureNum);
    return await axios.get(KH_DOMAIN + `/class?lectureNum=${lectureNum}`);
  },

  // 리뷰 불러오기
  viewList: async(review) => {
    console.log("loadReviewList 호출 : " + review);
    return await axios.get(KH_DOMAIN + `/class/loadReview?num=${review}`)
  },

  // 리뷰 작성
  reviewWrite: async(lecNum, memNum, title, content, img) => {
    const reviewData = {
      lecNum : lecNum,
      memNum : memNum,
      title : title,
      content : content,
      img : img
    }
    return await axios.post(KH_DOMAIN + "/class/reviewWrite", reviewData);
  },
  // 구독 정보 생성
  subRegister: async(paymentNum, type) => {
    const subscription = {
      paymentNum: paymentNum,
      type_: type
    };
    return await axios.post(KH_DOMAIN + "/subscription", subscription)
  },
  // 구독 정보 조회
  // getSubscription: async(num) => {
  //   return await axios.get(KH_DOMAIN + `subscription?id=${num}`);
  // },
  // 내 구독권 조회
  mySubsGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/mySubs?id=${id}`);
  },


  // 구독권 결제
  paymentInsert: async( memberNum, merchant_uid, amount, type) => {
    const payment = {
      memberNum: memberNum,
      created: merchant_uid,
      amount: amount,
      type: type 
    };
    return await axios.post(KH_DOMAIN + "/payment", payment);
  },
  // 클래스 결제
  paymentClass: async(lectureNum, memberNum, merchant_uid, amount) => {
    const payClass = {
      lectureNum: lectureNum,
      memberNum: memberNum,
      created: merchant_uid,
      amount: amount
    };
    return await axios.post(KH_DOMAIN + "/payClass" , payClass);
  },

  // 구독권 환불
  payBack: async(paySubNum) => {
    const payback = {
      paySubNum: paySubNum
    }
    return await axios.post(KH_DOMAIN + "/payBack", payback);
  },
  // My Cart 상품 구매.
  paymentCartClass: async(lectureNum, memberNum, amount) => {
    const payCart = {
      lectureNum: lectureNum,
      memberNum: memberNum,
      amount: amount
    };
    return await axios.post(KH_DOMAIN + "/payCart", payCart);
  },

  // 일반 강의 결제
  paymentIn: async(lectureNum, memberNum, merchant_uid, amount) => {
    const payment = {
      lectureNum: lectureNum,
      memberNum: memberNum,
      created: merchant_uid,
      amount: amount
    };
    return await axios.post(KH_DOMAIN + "/ordinaryPay", payment);
  },
  // 강의 환불
  payBackClass: async(paymentNum) => {
    const payBackClass = {
      paymentNum: paymentNum
    };
    return await axios.post(KH_DOMAIN + "/payBackClass", payBackClass)
  },
  

  // 강의페이지 메인이미지 불러오기
  loadLectureImg : async(categoryNum, lectureNum) => {
    return await axios.get(KH_DOMAIN + `/class/img?categoryNum=${categoryNum}&lectureNum=${lectureNum}`);
  },

  // 강의페이지 사용자 찜목록내에 중복 확인
  getWishChk: async(lectureNum, memberNum) => {
    return await axios.get(KH_DOMAIN + `/regWishChk?lectureNum=${lectureNum}&memberNum=${memberNum}`);
  },

  // 강의페이지 사용자 찜목록에 추가시키기
  acceptWishList: async(lectureNum, memberNum) => {
    const data = {
      lectureNum: lectureNum,
      memberNum: memberNum
    }
    return await axios.post(KH_DOMAIN + `/acceptWishList`, data);
  },

  // 강의페이지 사용자 찜목록에 추가시키기
  delWishList: async(lectureNum, memberNum) => {
    const data = {
      lectureNum: lectureNum,
      memberNum: memberNum
    }
    return await axios.post(KH_DOMAIN + `/delWishList`, data);
  },

  // 강의페이지 사용자 장바구니내에 중복 확인
  getCartChk: async(lectureNum, memberNum) => {
    return await axios.get(KH_DOMAIN + `/regCartChk?lectureNum=${lectureNum}&memberNum=${memberNum}`);
  },

  // 강의페이지 사용자 장바구니에 추가시키기
  acceptCartList: async(lectureNum, memberNum, quantity) => {
    const data = {
      lectureNum: lectureNum,
      memberNum: memberNum,
      quantity: quantity
    }
    return await axios.post(KH_DOMAIN + `/acceptCartList`, data);
  },
};


export default AxiosApi;