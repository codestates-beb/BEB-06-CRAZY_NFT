import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { myNft } from "api/my";
import { List, AutoComplete, Input, Card } from "antd";
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
      setNfts(info.data.data.my_nft);
      console.log("nfts", nfts);
    };

    fetchData();
  }, [address, nfts]);

  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    //console.log("onSelect", value);
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
              <Card hoverable cover={<img alt="nft" src={item.img} />}>
                <Meta title={item.title} description="www.instagram.com" />
              </Card>
            </List.Item>
          </>
        )}
      />
    </>
  );
};
export default UserNfts;
