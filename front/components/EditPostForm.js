import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Input } from 'antd';

import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';
import useInput from '../hooks/useInput';

const EditPostForm = ({ post, display = true }) => {
  // const { imagePaths } = useSelector((state) => state.post);
  const [visible, setVisible] = useState(display);
  const [text, setText] = useInput(post.content);
  
  // const imageInput = useRef();

  const dispatch = useDispatch();

  //업로드 끝났을때
  // useEffect(() => {
  //   if (addPostDone) {
  //     setText("");
  //   }
  // }, [addPostDone]);

  const onCancel = useCallback(() => {
    setVisible((perv) => !perv);
  });

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  // const onClickImageUpload = useCallback(() => {
  //   imageInput.current.click();
  // }, [imageInput.current]);

  // const removeImage = useCallback((index) => () => {
  //   dispatch({
  //     type: REMOVE_IMAGE,
  //     data: index,
  //   });
  // });

  const onSubmit = useCallback(() => {
    console.log('서브밋', text);
    // if (!text || !text.trim()) {
    //   return alert('게시글을 작성하세요.');
    // }
    // const formData = new FormData();
    // imagePaths.forEach((p) => {
    //   formData.append('image', p);
    // });
    // formData.append('content', text);
    // 글 수정하기 요청
    // return dispatch({
    //   type: ADD_POST_REQUEST,
    //   data: formData,
    // });
  }, [text]);

  // const onChangeImages = useCallback((e) => {
  //   console.log('images', e.target.files);
  //   const imageFormData = new FormData();
  //   [].forEach.call(e.target.files, (f) => {
  //     imageFormData.append('image', f);
  //   });
  //   dispatch({
  //     type: UPLOAD_IMAGES_REQUEST,
  //     data: imageFormData,
  //   });
  // });

  return (
    <Modal
      visible={visible}
    >
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
          <input
            type="file"
            name="image"
            multiple
            hidden
            // ref={imageInput}
            // onChange={onChangeImages}
          />
          <Button>이미지 업로드</Button>
          <Button style={{ float: "right" }} onClick={onCancel}>
            취소
          </Button>
          <Button type="primary" style={{ float: "right" }} htmlType="submit">
            수정
          </Button>
        </div>
        {/* <div>
          {imagePaths.map((v, i) => (
            <div key={v} style={{ display: "inline-block" }}>
              <img
                src={v.replace(/\/thumb\//, "/original/")}
                style={{ width: "200px" }}
                alt={v}
              />
              <div>
                <Button onClick={removeImage(i)}>제거</Button>
              </div>
            </div>
          ))}
        </div> */}
      </Form>
    </Modal>
  );
};

EditPostForm.propTypes = {
  post: PropTypes.object.isRequired,
  // loading: PropTypes.bool.isRequired,
  display: PropTypes.bool.isRequired,
};

export default EditPostForm;
