import React from "react";
import PropTypes from "prop-types";

const PostList = ({ posts = [], handleDelete, handleEdit }) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <tr key={post.title}>
            <td id={index} onClick={handleEdit}>
              {post.title}
            </td>
            <td>
              <button id={index} onClick={handleDelete}>
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td>No person to load</td>
        </tr>
      )}
    </tbody>
  </table>
);

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default PostList;
