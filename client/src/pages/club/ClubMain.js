import React,{ useState } from 'react';
import { Layout } from 'antd';
import {  Route, Routes } from 'react-router-dom';
import {ArticleDetail,CreateArticle} from "../../pages";
import { Catagory ,Articles} from '../../component';
import { useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;

const ClubMain =()=>{
    
    const {catagory,catagoryId}=useSelector((state) =>{
        return state.club;
      });
    const statusIcon = {
        all: <div>{catagoryId}</div>,
        notice: <div>{catagoryId}</div>,
        qna: <div>{catagoryId}</div>,
        free: <div>{catagoryId}</div>,
        club: <div>{catagoryId}</div>,
        rare: <div>{catagoryId}</div>,
        superrare: <div>{catagoryId}</div>,
    }
    const StatusIconComponent = statusIcon[catagory];
    return (
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Sider style={{height:"80vh",background:"#9747FF"}}>
                <Catagory  />
                </Sider>
                <Content>
                <Routes>
                    <Route path="*" element={<Articles />} />
                    <Route path="articledetail/:id" element={<ArticleDetail />} />
                    <Route path="createarticle" element={<CreateArticle />} />
                </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};
export default ClubMain;