import { club } from "./index";

function allClubsList() {
  return club.get("allclub");
}
function clubContents(club_id,category_id) {
  return club.get(`index/${club_id}/${category_id}`);
}
function publishArticle(newArticle) {
  return club.post(`write`,newArticle);
}
function getDetail(post_id) {
  return club.get(`detail/${post_id}`);
}
/*function updateProfileUser(imgData) {
  return sign.post("signintes", imgData);
}

function logoutUser() {
  return sign.post("logout");
}*/

export { allClubsList,clubContents,publishArticle,getDetail};