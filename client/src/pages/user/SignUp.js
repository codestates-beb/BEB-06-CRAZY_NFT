import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Layout, Upload, Form, Input,message } from "antd";
import {
  SketchOutlined,
  CheckCircleTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { registerUser } from "../../api/user";
import { getCA } from "../../api/nft";
const { Sider, Content } = Layout;

const SignUp = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUploading,setIsUploading]=useState(false);
  const [account, setAccount] = useState({
    isTrue: true,
    txType: null,
    account: "",
    network: null,
  });

  const loadAccountInfo = async () => {
    const { klaytn } = window;

    if (klaytn) {
      try {
        await klaytn.enable();
        setAccountInfo(klaytn);
        setNetworkInfo();
        klaytn.on("accountsChanged", () => setAccountInfo(klaytn));
      } catch (error) {
        console.log("User denied account access");
      }
    } else {
      console.log(
        "Non-Kaikas browser detected. You should consider trying Kaikas!"
      );
    }
  };

  const setAccountInfo = async () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;
    const kaiAddress = await klaytn.selectedAddress;
    
    await formRef.current.setFieldsValue({
      address: kaiAddress,
    });
    setAccount({
      account:kaiAddress,
      isTrue: false,
    });
  };

  const setNetworkInfo = () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;

    setAccount({ network: klaytn.networkVersion });
    klaytn.on("networkChanged", () => setNetworkInfo(klaytn.networkVersion));
  };

  const onFinish = async ({ address, password, upload, nickname }) => {
    let profileurl="";
    if(!!upload){
      profileurl =
      "https://" +
      upload.file.response.value.cid +
      ".ipfs.nftstorage.link/" +
      upload.file.name;
    }
    
    await registerUser({ address, password, profileurl, nickname });
    const sev=await getCA();
    const serverInfo=sev.data.data;
    dispatch({
      type: "accountSlice/login",
      payload: { address, profileurl, nickname ,server:serverInfo.address,ca:serverInfo.ca},
    });
    setTimeout(function () {
      window.location.href = "/";
    }, 1000);
  };

  const uploading=(info)=> {
    const { status } = info.file;
    if (status === 'uploading') {
      setIsUploading(true);
    }
    if (status === 'done') {
      setIsUploading(false);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <Layout>
      <Sider align="center" style={{ height: "100vh", background: "white" }}>
        <div onClick={() => navigate("/")}>home</div>
      </Sider>
      <Layout>
        <Content style={{ border: "1px solid violet" }} align="center">
          <Form
            ref={formRef}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            onFinish={onFinish}
          >
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please interlock Kaikas!",
                },
              ]}
            >
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                hidden={account.isTrue}
              />
              <Button
                onClick={loadAccountInfo}
                type="primary"
                shape="round"
                icon={<SketchOutlined />}
                style={{ minHeight: "44px", minWidth: "280px" }}
              >
                Kaikas
              </Button>
              {account.account}
            </Form.Item>
            <Form.Item
              label="Nickname"
              name="nickname"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                () => ({
                  validator(_, value) {
                    const special_pattern = /[~!@#$%^&*()_+|<>?:{}]/;
                    if (
                      !value ||
                      (special_pattern.test(value) === true && value.length > 7)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "비밀번호는 8자리 이상이고 특수 문자를 가져야합니다."
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="upload" label="Profil image">
              <Upload
                maxCount={1}
                action="https://api.nft.storage/upload"
                headers={{
                  withCredentials: true,
                  Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                }}
                listType="picture-card"
                onChange={(info)=>uploading(info)}
              >
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
              <Button type="primary" htmlType="submit" disabled={isUploading}>
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
