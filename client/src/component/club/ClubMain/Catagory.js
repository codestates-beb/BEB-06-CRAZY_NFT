import {
  AppstoreOutlined,
  UserOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Button, Menu, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clubSignup } from "../../../api/club";
const { Meta } = Card;
const { Paragraph } = Typography;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("전체글", "all", <UserOutlined />),
  getItem("공지사항", "notice", <SolutionOutlined />),
  getItem("Q&A", "qna", <AppstoreOutlined />),
  getItem("자유게시판", "free", <AppstoreOutlined />),
  getItem("클럽활동", "club", <AppstoreOutlined />),
  getItem("레어글", "rare", <AppstoreOutlined />),
  getItem("슈퍼레어글", "superrare", <AppstoreOutlined />),
];

const cataId = {
  all: 0,
  notice: 1,
  qna: 2,
  free: 3,
  club: 4,
  rare: 5,
  superrare: 6,
};
const Catagory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clubName, clubId, catagory, catagoryId } = useSelector((state) => {
    return state.club;
  });
  const { nickname, profileurl, address } = useSelector((state) => {
    return state.account;
  });
  const entry = async () => {
    try {
      await clubSignup({
        address: address,
        club_id: clubId,
      });
      message.success("가입신청을 하였습니다.");
    } catch (error) {
      message.error("가입신청에 실패 하였습니다.");
    }
  };
  const onClick = async (e) => {
    await dispatch({
      type: "clubSlice/selectCategory",
      payload: { category: e.key, categoryId: cataId[e.key] },
    });
    console.log(catagory, catagoryId);
    navigate(`/clubmain/${clubName}`);
  };
  return (
    <>
      <div className="side-profile">
        <Card
          style={{
            width: 203,
            marginTop: 16,
            background: "#F8F3FF",
          }}
          actions={[
            <Button onClick={entry}>가입신청</Button>,
            <Button onClick={() => navigate("/nftalllist")}>클럽 nft</Button>,
          ]}
        >
          <Meta
            avatar={<Avatar src={profileurl} />}
            title={nickname}
            description={<Paragraph ellipsis>{address}</Paragraph>}
          />
        </Card>
      </div>

      <Menu
        onClick={onClick}
        style={{
          background: "#9747FF",
        }}
        defaultSelectedKeys={[catagory]}
        mode="inline"
        items={items}
      />
    </>
  );
};
export default Catagory;
