import { club } from "./index";

function allClubsList() {
  return club.get("allclub");
}

function clubContents(club_id, category_id) {
  return club.get(`index/${club_id}/${category_id}`);
}
function publishArticle(newArticle) {
  return club.post(`write`, newArticle);
}
function getDetail(post_id) {
  return club.get(`detail/${post_id}`);
}
function postCommWrite(comment) {
  return club.post(`comment/write`, comment);
}
function getCommLike(post_id, address) {
  return club.get(`comment/like/${post_id}/${address}`);
}
function makeClub(clubInfo) {
  return club.post(`makeclub`, clubInfo);
}
function clubSignup(post_apply) {
  return club.post(`signup`, post_apply);
}

/*function updateProfileUser(imgData) {
  return sign.post("signintes", imgData);
}

function logoutUser() {
  return sign.post("logout");
}*/

export {
  allClubsList,
  clubContents,
  publishArticle,
  getDetail,
  postCommWrite,
  getCommLike,
  makeClub,
  clubSignup,
};
