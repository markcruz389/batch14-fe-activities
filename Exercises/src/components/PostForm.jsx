import React from "react";
import PropTypes from "prop-types";
import TextInput from "./common/TextInput";
import TextareaInput from "./common/TextareaInput";

const PostForm = ({ title, body, formAction, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <TextInput
      name='title'
      label='Title'
      placeholder='Enter title'
      value={title}
      onChange={onChange}
    />
    <TextareaInput
      name='body'
      label='Body'
      placeholder='Enter body'
      value={body}
      onChange={onChange}
    />
    <input type='submit' value={formAction} />
  </form>
);

PostForm.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PostForm;
