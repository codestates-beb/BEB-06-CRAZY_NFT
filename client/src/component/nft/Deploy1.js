
import React from 'react';
import { imgUpload } from '../../api/nft';
import { useSelector } from 'react-redux';


const Deploy1 = () => {
  const clubId = useSelector((state) => {
    return state.club.clubId;
  });
  const upload = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(e.target.file.files);
        const fileList=Object.values(e.target.file.files);
        fileList.forEach((img)=>{
          formData.append('img', img);
        });
        
        formData.append('club_id', clubId);
        formData.append('dir', 1); 
        formData.append('total', 5); 
        try {
            imgUpload(formData)
            .then(function (res) {
              if(res.status===200){
                
                console.log(res.data,"1번")
              }
            })
      }
      catch(e) {
          console.log(e);
      }
    };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={upload}>
        <div className="w-full text-center mt-4 font-bold">
          <span className="text-4xl text-red-700">
            background(제일 아래 레이아웃인 이미지)를 업로드하세요!
            <div style={{color:"red"}}>
              <div>!주의!</div>
              <div>한번 업로드가 되면 다시 업로드 시킬수 없습니다.</div>
              <div>다음 단계로 넘어 갈시에도 이전 단계로 되돌릴수 없습니다.</div>
            </div>
          </span>
        </div>
        <input type="file" name="file" multiple webkitdirectory="true" />
        {/* <button type='submit'>업로드</button> */}
        <button type="submit">업로드</button>
      </form>
    </div>
  );
};
export default Deploy1;
