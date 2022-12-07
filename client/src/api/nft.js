import { nft, nftMulti } from "./index";
/**12. NFT 발행 (Deploy) 요청 
 * {
  “club_id”:<club id>,
  “nft_name”: <nft name>,
  “nft_symbol”:<nft symbol>,
  “nft_desc”: <nft description>,
  “nft_price”: <nft price>, // 100 PCT
  “deploy_count”: <NFT 발행 갯수>
}
*/
function nftDeploy(info) {
  return nft.post("deploy", info);
}
/**13. NFT 민팅 요청 
 * {
    “address”: <회원 account>,
    “tx_hash”: <transaction hash>
    “club_id”:<club id>
}
*/
function nftMint(info) {
  return nft.post("mint", info);
}
/**14. 서버 계정(Account) 및 contract address 요청 */
function getCA() {
  return nft.get("address");
}
/**15. NFT 이미지 생성을 위한 Parts 이미지 upload 요청
 * "club_id":< club id >, 
"dir":< 폴더 이름>, 
"total": <전채 폴더 갯수>
img : <parts image>
img : <parts image>
img : <parts image>
 */

function imgUpload(formdata) {
  return nftMulti.post("upload", formdata);
}
/**17. 클럽에서 민팅된 모든  nft 보기 요청 */
function getClubNfts(cid) {
  return nftMulti.get(`all/${cid}`);
}

export { nftDeploy, nftMint, getCA, imgUpload, getClubNfts };
