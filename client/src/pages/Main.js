import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Navi } from "../component";
import { allClubsList } from '../api/club';
import {Layout,List,Card } from 'antd';
import { useDispatch } from 'react-redux';
const { Header, Content } = Layout;
const data = Array.from({
  length: 23,
}).map((_, i)=>({
  title: `Title ${i+1}`,
}));

const Main =()=>{
  const [clubs,setClubs]=useState(data);
  const navigate =useNavigate();
  const dispatch=useDispatch();

  useEffect(() => {

    const fetchData = async () => {
      const clublist=await allClubsList();
      setClubs(clublist.data.data);
      console.log(clublist.data.data);
    };

    fetchData();
  }, []);

  const clickclub=(clubId,clubName)=>{
    dispatch({type:"clubSlice/selectClub",payload:{clubId,clubName}});
    navigate(`/clubmain/${clubName}`);
  };

    return (
        <Layout>
            <Header><Navi /></Header>
            <Content>
            <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xl: 4,
                }}
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 12,
                }}
                dataSource={clubs}
                renderItem={(item) => (
                <List.Item>
                    <Card onClick={()=>clickclub(item.id,item.title)} title={item.title}>{item.createdAt}</Card>
                </List.Item>
                )}
            />
            </Content>
            
        </Layout>
    );
};
export default Main;