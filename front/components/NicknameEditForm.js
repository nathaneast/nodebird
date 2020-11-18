import React, { useCallback } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
 
  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <Form
      style={{ marginBottom: '28px', border: '1px solid black', padding: '20px' }}
    >
      <Input.Search
        value={nickname}
        addonBefore="닉네임"
        enterButton="수정"
        onChange={onChangeNickname}
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
