import React, { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Input, Form, Button } from 'antd';

import useInput from '../hooks/useInput';
import { EDIT_POST_REQUEST } from '../reducers/post';

const PostCardContent = ({ content, postId, setContent, editOff, editMode }) => {
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput(content);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    try {
      dispatch({
        type: EDIT_POST_REQUEST,
        data: { postId, content: text },
      });
      setContent(text);
      editOff();
    } catch (error) {
      console.error(error);
    }
  }, [text]);

  const onCancel = useCallback(() => {
    editOff();
    setText(content);
  });

  return (
    editMode ? (
      <Form
        style={{ margin: "10px 0 20px" }}
        encType="multipart/form-data"
        onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
      />
      <div>
        <Button style={{ float: "right" }} onClick={() => onCancel()}>
          취소
        </Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          확인
        </Button>
      </div>
    </Form>
    ) : (
    <div>
      {content.split(/(#[^\s#]+)/g).map((v) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link
              href={{ pathname: "/hashtag", query: { tag: v.slice(1) } }}
              as={`/hashtag/${v.slice(1)}`}
              key={v}
              prefetch={false}
            >
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
    )
  );
};

PostCardContent.propTypes = {
  content: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  postId: PropTypes.number,
  setContent: PropTypes.func,
  editOff: PropTypes.func,
};

export default PostCardContent;
