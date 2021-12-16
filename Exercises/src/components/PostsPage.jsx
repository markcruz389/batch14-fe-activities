import React, { useState, useEffect, useReducer } from "react";
import PersonList from "./PostList";
import { getPosts, getPost } from "../api/postApi";
import AddPostModal from "./AddPostModal";
import EditPostModal from "./EditPostModal";

const UPDATE_ACTION = "Update";
const ADD_ACTION = "Add";

const modalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_ADD_MODAL":
      return { ...state, add: true };
    case "OPEN_EDIT_MODAL":
      return { ...state, edit: true };
    case "CLOSE_MODAL":
      return { ...state, add: false, edit: false };
    default:
  }
};

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [customPost, setCustomPost] = useState({
    title: "",
    body: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [formAction, setFormAction] = useState(ADD_ACTION);
  const [maxLength, setMaxLength] = useState(0);
  const [modalIsOpen, modalDispatcher] = useReducer(modalReducer, {
    add: false,
    edit: false,
  });

  useEffect(() => {
    (async () => {
      const data = await getPosts();
      setPosts(data ?? []);
    })();
  }, []);

  useEffect(() => {
    if (posts.length > maxLength) {
      setMaxLength(posts.length);
    }
  }, [posts.length, maxLength]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomPost({ ...customPost, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (customPost.title.trim() === "") {
      alert("Title should not be blank");
      return;
    }

    if (customPost.body.trim() === "") {
      alert("Body should not be blank");
      return;
    }

    switch (formAction) {
      case ADD_ACTION:
        setPosts([...posts, { ...customPost }]);
        break;
      case UPDATE_ACTION:
        setPosts(
          posts.map((post, index) => ({
            ...post,
            title: index === editIndex ? customPost.title : post.title,
          }))
        );
        break;
      default:
    }

    resetFields();
    modalDispatcher({ type: "CLOSE_MODAL" });
  };

  const handleFetch = () => {
    setMaxLength(maxLength + 1);
    (async () => {
      const post = await getPost(maxLength + 1);
      setPosts([...posts, { ...post }]);
    })();
  };

  const handleDelete = (event) => {
    const { id } = event.target;
    setPosts(posts.filter((post, index) => index !== parseInt(id, 10)));
  };

  const handleEdit = (event) => {
    const index = event.target.id;
    const title = event.target.innerText;

    modalDispatcher({ type: "OPEN_EDIT_MODAL" });
    setEditIndex(parseInt(index, 10));
    setCustomPost({ ...customPost, title, body: posts[index].body });
    setFormAction(UPDATE_ACTION);
  };

  const resetFields = () => {
    setCustomPost({
      title: "",
      body: "",
    });
    setFormAction(ADD_ACTION);
    setEditIndex(null);
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            modalDispatcher({ type: "OPEN_ADD_MODAL" });
          }}
        >
          Add post
        </button>
      </div>
      <div>
        <button onClick={handleFetch}>Fetch</button>
      </div>
      <div>
        <PersonList
          posts={posts}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
      <AddPostModal
        modalIsOpen={modalIsOpen.add}
        closeModal={() => {
          modalDispatcher({ type: "CLOSE_MODAL" });
        }}
        title={customPost.title}
        body={customPost.body}
        onChange={handleChange}
        onSubmit={handleSubmit}
        formAction={formAction}
      />

      <EditPostModal
        modalIsOpen={modalIsOpen.edit}
        closeModal={() => {
          modalDispatcher({ type: "CLOSE_MODAL" });
          resetFields();
        }}
        title={customPost.title}
        body={customPost.body}
        onChange={handleChange}
        onSubmit={handleSubmit}
        formAction={formAction}
      />
    </>
  );
}

export default PostsPage;
