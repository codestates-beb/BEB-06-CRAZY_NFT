import React, { useState } from "react";
import { Button, Steps,Form,Input, message } from "antd"; //message Input
import { Deploy1, Deploy2, Deploy3, Deploy4, Deploy5 } from "component";
import { nftDeploy } from "api/nft";
import { useSelector } from "react-redux";



const NftMint = () => {
  const clubId = useSelector((state) => {
    return state.club.clubId;
  });
  const [step, setStep] = useState({current:0,stepDone:true});
  const [done, setDone] = useState(false);
  const next = () => {
    setStep({current:step.current + 1,stepDone:true});
  };
  const finishStep=()=>{
    setStep({...step,stepDone:false});
  };
  const steps = [
  <Deploy1 finishStep={finishStep}/>, 
  <Deploy2 finishStep={finishStep}/>, 
  <Deploy3 finishStep={finishStep}/>, 
  <Deploy4 finishStep={finishStep}/>, 
  <Deploy5 finishStep={finishStep}/>];

  const deployNft = async (value) => {
    console.log(value);
    try {
      message.loading("발행 중 입니다.");
      const nfts=await nftDeploy({
        club_id: clubId,
        nft_name: value.nft_name,
        nft_symbol: value.nft_symbol,
        nft_desc: value.nft_desc,
        nft_price: Number(value.nft_price), // 100 PCT
        deploy_count: Number(value.deploy_count),
      });
      
      console.log(nfts);
      message.success("발행 성공");
    } catch (error) {
      
    }
    
  };

  return (
    <div style={{background:"white"}}>
      <Steps current={step.current} items={steps} />
      <div
        style={{
          minHeight: "200px",
          marginTop: "16px",
          paddingTop: "80px",
          textAlign: "center",
          background: "#fafafa",
          border: "1px dashed #e9e9e9",
          borderRadius: "2px",
        }}
      >
        {steps[step.current]}
      </div>
      <div className="steps-action">
        {step.current < steps.length - 1 && (
          <Button type="primary" disabled={step.stepDone} onClick={() => next()}>
            Next
          </Button>
        )}
        {step.current === steps.length - 1 && (
          <Button type="primary" disabled={step.stepDone} onClick={() => setDone(true)}>
            Done
          </Button>
        )}
      </div>
      {done && (
        <Form
          layout="vertical"
          onFinish={deployNft}
        >
          <Form.Item label="nft_name" name="nft_name" rules={[{required: true}]}>
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="nft_symbol" name="nft_symbol" rules={[{required: true}]}>
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="nft_desc" name="nft_desc" rules={[{required: true}]}>
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="nft_price" name="nft_price" rules={[{required: true}]}>
            <input type="number" placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="deploy_count" name="deploy_count" rules={[{required: true}]}>
            <input type="number" placeholder="input placeholder" />
          </Form.Item>
          <Form.Item >
            <Button type="submit" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
        
      )}
      <br></br>
      <br></br>
    </div>
  );
};
export default NftMint;
