import React,{ useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button,Layout,Upload,Form ,Input} from "antd";
import {SketchOutlined,CheckCircleTwoTone,PlusOutlined} from "@ant-design/icons";
import Caver from 'caver-js'

const {Sider,Content}=Layout;

const SignUp =()=>{
  
    const navigate=useNavigate();
    const [account,setAccount]=useState({
        isTrue:true,
        txType: null,
        account: '',
        balance: 0,
        network: null,
    });

    const loadAccountInfo = async () => {
        const { klaytn } = window
    
        if (klaytn) {
          try {
            await klaytn.enable()
            setAccountInfo(klaytn)
            setNetworkInfo();
            klaytn.on('accountsChanged', () => setAccountInfo(klaytn))
          } catch (error) {
            console.log('User denied account access')
          }
        } else {
          console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
        }
      }
    
    const setAccountInfo = async () => {
      
        const { klaytn } = window
        if (klaytn === undefined) return
        const caver = new Caver(klaytn)
        const account =  klaytn.selectedAddress
        const balance = await caver.klay.getBalance(account)
        setAccount({
          account,
          balance: caver.utils.fromPeb(balance, 'KLAY'),
          isTrue:false
        })
      
        
      }
    
    const  setNetworkInfo = () => {
        const { klaytn } = window
        if (klaytn === undefined) return
    
        setAccount({ network: klaytn.networkVersion })
        klaytn.on('networkChanged', () => setNetworkInfo(klaytn.networkVersion))
      }

    return (
        <Layout>
            <Sider align="center" style={{height:"100vh",background:"white"}}>
              <div onClick={()=>navigate("/")}>home</div>
            </Sider>
            <Layout>
                
                <Content style={{border:"1px solid violet"}} align="center">
                    
                    <Form
                      labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 14,
                      }}
                      layout="horizontal"
                      
                    >
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please interlock Kaikas!',
                        },
                        ]}
                      >
                        <CheckCircleTwoTone twoToneColor="#52c41a" hidden={account.isTrue} />
                        <Button onClick={loadAccountInfo} type="primary" shape="round" icon={<SketchOutlined />} style={{minHeight:"44px",minWidth:"280px"}}>
                            Kaikas
                        </Button>
                        {account.account}
                      </Form.Item>
                      <Form.Item label="Nickname" 
                      name="nickname"
                      rules={[
                        {
                            required: true,
                            message: 'Please input your nickname!',
                        },
                        ]}>
                        <Input />
                      </Form.Item>
                      <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                          {
                              required: true,
                              message: 'Please input your password!',
                          },
                          () => ({
                              validator(_, value) {
                                const special_pattern = /[~!@#$%^&*()_+|<>?:{}]/;
                                if (!value|| (special_pattern.test(value) === true&&value.length>7)){
                                
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('비밀번호는 8자리 이상이고 특수 문자를 가져야합니다.'));
                              },
                            }),
                          ]}
                      >
                          <Input.Password />
                      </Form.Item>
                      <Form.Item label="Upload" valuePropName="fileList">
                        <Upload maxCount={1} action='https://api.nft.storage/upload' headers={{withCredentials:true,"Authorization":`Bearer ${process.env.REACT_APP_API_KEY}`}} listType="picture-card">
                          <div>
                            <PlusOutlined />
                            <div
                              
                              style={{
                                marginTop: 8,
                              }}
                            >
                              Upload
                            </div>
                          </div>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                        >
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                    </Form>
                    
                </Content>
                
            </Layout>
        </Layout>
    );
};
export default SignUp;