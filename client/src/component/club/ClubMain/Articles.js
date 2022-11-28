import {List,Button} from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { clubContents } from "../../../api/club";
import React,{ useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Articles =()=>{
    const [articles,setArticles]=useState([]);
    const {clubId,clubName,catagoryId,catagory}=useSelector((state) =>{
        return state.club;
    });
    const navigate=useNavigate();

    useEffect(() => {

        const fetchData = async () => {
        const contents=await clubContents(clubId,catagoryId);
        
        setArticles(contents.data.data);
        };

        fetchData();
    }, [catagoryId]);
    
    return (
        <List
        size="large"
        header={<div style={{fontSize: "32px"}}>{catagory} <Button onClick={()=>navigate(`/clubmain/${clubName}/createarticle`)} icon={<EditOutlined />}>새 글 쓰기</Button></div>}
        pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
        dataSource={articles}
        renderItem={(item) => <List.Item style={{border:"1px solid gray"}}>{item}</List.Item>}
        />
    );    
};
export default Articles;