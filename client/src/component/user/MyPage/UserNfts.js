import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { myNft } from "api/my";
import { List, AutoComplete, Input, Card } from "antd";
import axios from "axios";
const { Meta } = Card;

const getRandomInt = (max, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const searchResult = (query) =>
  new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });
const UserNfts = () => {
  const [nfts, setNfts] = useState([]);
  const { address } = useSelector((state) => {
    return state.account;
  });
  useEffect(() => {
    const fetchData = async () => {
      const info = await myNft(address);
      const nfts=info.data.data.my_nft;
      const jsondata=[];
      for(const nft of nfts){
        try {
          let meta=await axios(`https://ipfs.io/ipfs/${nft.NFT.metaCid}/${nft.NFTId}.json`);
          let img=meta.data.image.replace("ipfs://","https://ipfs.io/ipfs/");
          console.log(img);
          jsondata.push({...meta.data,address:nft.address,image:img});
        } catch (err) {
          console.log(err);
        }
        
      }
      console.log(jsondata);
      setNfts(jsondata);
      console.log("nfts");
    };

    fetchData();
  }, [address]);

  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log("onSelect", value, nfts);
  };

  return (
    <>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
          width: "100%",
        }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Input.Search
          size="large"
          placeholder="Search items, collections, and accounts"
          enterButton
        />
      </AutoComplete>
      <List
        size="large"
        grid={{ column: 5 }}
        dataSource={nfts}
        renderItem={(item) => (
          <>
            <List.Item>
              <Card
                hoverable
                cover={
                  <img style={{ height: "200px" }} alt="nft" src={item.image} />
                }
              >
                <Meta title={item.name} description={item.description} />
              </Card>
            </List.Item>
          </>
        )}
      />
    </>
  );
};
export default UserNfts;
