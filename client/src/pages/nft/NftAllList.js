import { NftNavi } from "../../component";
import NftDetail from "./NftDetail";
import { Layout, List, Card ,Skeleton} from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useState ,useEffect} from "react";
import { getClubNfts } from "../../api/nft";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const { Header, Content } = Layout;
const data = [
  <Skeleton active />,
  <Skeleton active />,
  <Skeleton active />,
  
];
const NftAllList = () => {
  const [nftList,setNftList]=useState(data);
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const {clubId}=useSelector((state) =>{
    return state.club;
  });
  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await getClubNfts(clubId);
        const nfts = result.data.data;
        const jsondata=[];
        for(const nft of nfts){
          try {
            let meta=await axios(`https://ipfs.io/ipfs/${nft.token_uri}/${nft.token_id}.json`);
            jsondata.push({...meta.data,address:nft.address});
          } catch (err) {
            console.log(err);
          }
          
        }
        setNftList(jsondata);
        console.log(jsondata);
      } catch (error) {
        console.log(error);
      }
      
    };

    fetchData();
  }, []);

  const selectnft=(meta)=>{
    dispatch({type:"nftSlice/selectNft",payload:{meta}});
    navigate(`/nftalllist/nftdetail/${meta.name}`);
  };

  return (
    <Layout>
      <Header>
        <NftNavi />
      </Header>
      <Content>
        <Routes>
          <Route
            path="*"
            element={
              
              <List
                grid={{
                  gutter: 16,
                  column: 4,
                }}
                dataSource={nftList}
                renderItem={(item) => (
                  <List.Item>
                    <Card onClick={item.address&&(()=>selectnft(item))} title={item.name}>{item.image?item.image:item}</Card>
                  </List.Item>
                )}
              />
            }
          />
          <Route path="nftdetail/:id" element={<NftDetail />} />
        </Routes>
      </Content>
    </Layout>
  );
};
export default NftAllList;
