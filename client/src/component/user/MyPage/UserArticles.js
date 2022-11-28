import {List} from "antd";
import { useSelector } from 'react-redux';
import { myContent } from "../../../api/my";
import React,{ useState,useEffect } from 'react';

const UserArticles =()=>{
    const [articles,setArticles]=useState([]);
    const {address}=useSelector((state) =>{
        return state.account;
      });
    useEffect(() => {

        const fetchData = async () => {
        const contents=await myContent(address);
        setArticles(contents.data.data.my_contents);
        console.log(contents.data.data.my_contents);
        };

        fetchData();
    }, []);
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ];
    return (
        <List
        size="large"
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        
        dataSource={articles}
        renderItem={(item) => <List.Item style={{border:"1px solid gray"}} >title:{item.title} content:{item.content}</List.Item>}
        />
    );    
};
export default UserArticles;