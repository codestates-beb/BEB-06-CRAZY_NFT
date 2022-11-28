import { createSlice } from '@reduxjs/toolkit';


const initialState= { 
  clubId:undefined,
  clubName:"",
  catagory:"all",
  catagoryId:0,
  post_id:undefined,
};

const clubSlice = createSlice({
  name: 'clubSlice',
  initialState,
  reducers: {
    selectClub: (state, action) => {
      state.clubId = action.payload.clubId;
      state.clubName = action.payload.clubName;
    },
    selectCatagory: (state, action) => {
        state.catagory = action.payload.catagory;
        state.catagoryId = action.payload.catagoryId;
    },
    selectPost: (state, action) => {
      state.post_id = action.payload.post_id;
      
    },
    initCata:(state)=>{
      state.catagory="all";
      state.catagoryId=0;
    },
  },
  
});
export default clubSlice;
export const { selectClub,selectCatagory,selectPost,initCata } = clubSlice.actions;