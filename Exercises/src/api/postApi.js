import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/";

export const getPosts = async () => {
  try {
    let response = await axios.get(API_BASE_URL + "posts/");

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data.slice(0, 10);
  } catch (e) {
    console.log(e);
  }
};

export const getPost = async (id) => {
  try {
    let response = await axios.get(API_BASE_URL + `posts/${id}`);

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
