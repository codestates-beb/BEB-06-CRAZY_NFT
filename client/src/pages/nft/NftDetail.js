import { Image, Col, Row, message } from "antd";
import React from "react";
import Caver from "caver-js";
import {  useSelector } from "react-redux";
import { nftMint } from "../../api/nft";

const NftDetail = () => {
  
  const meta=useSelector((state)=>{
    return state.nft.meta;
  });
  const {address,server,ca}=useSelector((state)=>{
    return state.account;
  });
  const club_id=useSelector((state)=>{
    return state.club.clubId;
  });
  const trade = async()=>{
    try {
      const { klaytn } = window;
      await klaytn.enable();
      const caver = new Caver(klaytn);
      const kip7Instance = await new caver.klay.KIP7(ca);
      let mintInfo = await kip7Instance.transfer(server, 100000000000000000000, {
        from: address,
      });
      const tx_hash=mintInfo.transactionHash;
      setTimeout(async()=> {
        const result=await nftMint({address,club_id,tx_hash});
        message.success(result.data.data.token_uri);
      }, 10000);
      
    } catch (error) {
      console.log(error);
    } 
  };
  return (
    <div>
      <button onClick={()=>console.log(server)}>server</button>
      <Row>
        <Col span={6} offset={4}>
          <Image
            width={200}
            src={""}
          />
        </Col>
        <Col span={6} offset={4} style={{ border: "1px solid red" }}>
          NFT 정보
          <div>address: {meta.address}</div>
          <div>name: {meta.name}</div>
          <div>description: {meta.description}</div>
          {meta.attributes.map((attribute)=>{
            return (<div key={attribute.trait_type}>trait_type:{attribute.trait_type} value:{attribute.value}</div>);
          })}
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6} style={{ border: "1px solid red" }}>
          거래 컴포넌트
          <button onClick={trade} >구입</button>
        </Col>
        </Row>
    </div>
  );
};
export default NftDetail;
