import BASE_URL from "../apiConfig";
import axios from "axios";

export function getUsers(
  request,
  path,
  setUsersToMap,
  setUpdatedUser,
  toSearch,
) {
  axios
    .get(`${BASE_URL}/user/getusers`, {
      withCredentials: true,
      params: { users: request, toSearch: toSearch },
    })
    .then((res) => {
      setUpdatedUser(res.data.currentActiveUser);
      let users;
      if (path === "following") {
        users = res.data.currentActiveUser.follows;
      } else if (path === "followers") {
        users = res.data.currentActiveUser.followedBy;
      } else if (path === "search") {
        users = res.data.users;
      } else {
        users = res.data.randomUsers.length === 0 ? [] : res.data.randomUsers;
      }
      setUsersToMap(users);
    })
    .catch((err) => {
      console.log(err);
    });
}

//------blob to binary string 
export const blobToBinaryString = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const binaryString = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
      resolve(binaryString);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
};

//--------------binary to blob 
export async function binaryStringToBlob (binaryString) {
 
  const type = "audio/wav";
  const buffer = new ArrayBuffer(binaryString.length);
  const bufferView = new Uint8Array(buffer);
  for (let i = 0; i < binaryString.length; i++) {
    bufferView[i] = binaryString.charCodeAt(i);
  }
  return new Blob([buffer], { type });
};
