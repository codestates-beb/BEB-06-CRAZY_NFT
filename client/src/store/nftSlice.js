import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";

const initialState= { 
    meta:{
      image:"ipfs://bafybeict5nwc3wg7qi2arz2o76u5elphvjrwr4gaddc2rqz7wwu2pqspe4/1.png",
      address:"0x723c3659772Fe80284793C6a20bff9071bc683F6",
      name:"KKKK NFT Test #1",
      description:"Crazy NFT Test",
      attributes:[
        {trait_type: '1', value: 'Black'},
        {trait_type: '2', value: 'Red'},
        {trait_type: '3', value: 'Yellow'},
        {trait_type: '4', value: 'Small'},
        {trait_type: '5', value: 'Shapes'},
        {trait_type: '6', value: 'Middle'},
        {trait_type: '7', value: 'Middle'}
      ]
    }
};

const nftSlice = createSlice({
  name: 'nftSlice',
  initialState,
  reducers: {
    selectNft: (state, action) => {
      console.log(action.payload.meta);
      state.meta = action.payload.meta;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});
export default nftSlice;
export const { selectNft } = nftSlice.actions;