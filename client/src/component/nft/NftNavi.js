import React from 'react';
import { useNavigate } from "react-router-dom";
import { Menu,Input,message } from 'antd';
import { persistor } from "../../store/store";
import { useSelector } from 'react-redux';
import Caver from "caver-js";
import { nftMint } from "api/nft";
const { Search } = Input;
function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("DEPLOY", "deploy"),
    getItem("GetNft", "getnft"),
    getItem("LogOut", "logout"),
  ];
const Navi =({search})=>{
    const navigate = useNavigate();
    
    const { address, server, ca } = useSelector((state) => {
      return state.account;
    });
    const club_id = useSelector((state) => {
      return state.club.clubId;
    });
    //nft민팅하기
    const trade = async () => {
      try {
        const { klaytn } = window;
        await klaytn.enable();
        const caver = new Caver(klaytn);
        console.log(ca);
        const kip7Instance = await new caver.klay.KIP7(ca);
        console.log(server);
        let mintInfo = await kip7Instance.transfer(server, 100000000000000000000, {
          from: address,
        });
        const tx_hash = mintInfo.transactionHash;
        console.log("d", tx_hash);
        message.loading("민팅하는중 입니다.");
        setTimeout(async()=> {
          const result=await nftMint({address,club_id,tx_hash});
          message.success(result.data.data.token_uri);
        }, 30000);
      } catch (error) {
        console.log(error);
        if(error.message==="Internal JSON-RPC error."){
          message.error("토큰이 부족합니다.");
        }else{
          message.error(error.message);
        }
      }
    };


    const selectKey = {
        deploy: () => {
          navigate("nftmint");
        },
        getnft: () => {
          trade();
        },
        logout: () => {
          persistor.purge();
          window.location.replace("/");
        },
    };
    const onSearch = (value) => {
      search(value);
    };
    const onMenu = (e) => {
      selectKey[e.key]();
    };
    return (
        <div className="navi">
            <img alt="site_name" src="/crazyNFT.png"  onClick={()=>navigate('/')} className="logo"></img>
            
            <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
                width: 600,
                float: "left",
                padding:"15px"
            }}
            />
            
            <Menu
                onClick={onMenu}
                style={{ minWidth: 0, flex: "auto" ,display:"flex",justifyContent:"right"}}
                theme='dark'
                mode="horizontal"
                items={items}
            />
        </div>
    );
};
export default Navi;