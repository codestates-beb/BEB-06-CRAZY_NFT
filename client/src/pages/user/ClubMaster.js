import {Layout} from "antd";
import { AdminMenu,UserInfo,UserArticles,UserNfts,UserClub ,ClubEntryList} from "../../component";
import React,{ useState } from 'react';

const { Header, Footer, Sider, Content } = Layout;
const ClubMaster =()=>{
    const [menu,setMenu]=useState("info");
    const statusIcon = {
        info: <UserInfo />,
        articles: <UserArticles />,
        club: <UserClub />,
        nfts: <UserNfts />,
        entry: <ClubEntryList />,
    }
    const StatusIconComponent = statusIcon[menu];
    const selectMenu=(menu)=>{
        setMenu(menu);
    }
    return (
        <Layout>
            <Sider width={300} style={{background:"#9747FF",height:"100vh"}}>
                <AdminMenu selectMenu={selectMenu}/>
            </Sider>
            <Layout>
                <Header style={{background:"white"}}>Header</Header>
                <Content>{StatusIconComponent}</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
};
export default ClubMaster;