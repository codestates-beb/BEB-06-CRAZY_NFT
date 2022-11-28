import { AppstoreOutlined, UserOutlined, SolutionOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  getItem('전체글', 'all', <UserOutlined /> ),
  getItem('공지사항', 'notice',  <SolutionOutlined />),
  getItem('Q&A', 'qna', <AppstoreOutlined />, ),
  getItem('자유게시판', 'free', <AppstoreOutlined />, ),
  getItem('클럽활동', 'club', <AppstoreOutlined />, ),
  getItem('레어글', 'rare', <AppstoreOutlined />, ),
  getItem('슈퍼레어글', 'superrare', <AppstoreOutlined />, )
];
const cataId = {
  all: 0,
  notice: 1,
  qna: 2,
  free: 3,
  club: 4,
  rare: 5,
  superrare: 6,
}
const Catagory =()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {clubName,catagory}=useSelector((state) =>{
      return state.club;
    });
    const onClick = (e) => {
      
      dispatch({type:"clubSlice/selectCatagory",payload:{catagory:e.key,catagoryId:cataId[e.key]}});
      navigate(`/clubmain/${clubName}`);
    };
    return (
      <>
      <Menu
        onClick={onClick}
        style={{
          background:"#9747FF",
          
        }}
        defaultSelectedKeys={[catagory]}
        mode="inline"
        items={items}
      />
      </>
    );
};
export default Catagory;