//const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const service = require("../services/user.service");

//user 로그인 /signin
exports.post_signin = async (req, res, next) => {
  const { address, password } = req.body;
  console.log(address, password);
  if (!(address && password))
    return res.status(404).json("입력정보가 부족합니다");
  try {
    // 로그인 처리 함수 구현 필요
    const userData = await service.getUserData(address, password);
    // // delete userData.password; //비밀번호 삭제
    // // delete userData.deletedAt;
    // //const loginData = jwt.sign(userData, process.env.ACCESS_SECRET);
    // // res.cookie("loginData", loginData, {
    // //   maxAge: 3 * 60 * 60 * 1000, //3시간유효
    // //   httpOnly: false,
    // // });
///////////////test code/////////////
    let rtn_obj = new Object();
    rtn_obj.nickname = "kkkk";
    rtn_obj.imageURI = "IPFS://jbfjrejbjervberruew43jb4j25";
    console.log(rtn_obj);
/////////////////////////////////////
    if(rtn_obj === "error") {
      console.log("로그인 성공");
      return res.status(200).json({
        "data": userData
      });   
    }
    else 
    {
      console.log("로그인 실패");
      return res.status(404).json({
        "data": "아이디 또는 비밀번호가 잘못되었습니다."
      });   
    }

  } catch (err) {
    console.log("로그인 실패");
    return res.status(404).json({
      "data": "fail"
    });
  }
};

// user 회원 가입 /signup
exports.post_signup = async function (req, res, next) {
  const { address, password, nickname, profileurl } = req.body;
  console.log("signup 데이터 체크", profileurl, password, nickname, address);

  if (!(profileurl && password && nickname && address))
    return res.status(404).json({
      "data": "입력정보 부족"
    }); 

  try {
    // 회원가입 처리 함수 구현 필요
    const makeUser = await service.createUser(profileurl, password, nickname, address);

    return res.status(200).json({
      data: "success",
    });
  } catch (err) {
    return res.status(404).json({
      "data": "fail"
    });
  }
};

/*
//get 유저정보 조회 /info
const info = async (req, res, next) => {
  const loginData = req.cookies.loginData;
  const { id, address } = loginData;
  try {
    const postList = await getUserPost(id);
    const ethBalance = await getEthBalance(address);
    const tokenBalance = await getTokenBalance(address);
    const nftBalance = await getNftBalance(address);
    return res.status(200).json({
      status: true,
      message: "유저정보 검색",
      loginData,
      ethBalance,
      tokenBalance,
      nftBalance,
      postList, //나의 게시글목록
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      status: false,
      message: "유저정보 검색이 실패하였습니다",
    });
  }
};

//POST 회원정보 수정 /edit
const edit = async (req, res, next) => {
  try {
    console.log("프로필 이미지 업로드", req.file);
    const profileUrl = await imgUpload(req.file ? req.file.buffer : req.file);
    const loginData = req.cookies.loginData;
    const { id } = loginData;
    const result = await updateUser(profileUrl, id);

    console.log("결과", result);

    if (result) {
      return res.status(200).json({
        status: true,
        message: "My-profile",
      });
    } else {
      return res.status(400).json({
        status: false,
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
*/
