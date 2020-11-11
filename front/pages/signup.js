import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Input, Form, Button, Checkbox } from 'antd';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput'

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const [id, onChangeId] = useInput('');
  const [nickName, onChangeNickName] = useInput('');
  const [password, onChangePassword] = useInput('');
  
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if(!term) {
      return setTermError(true);
    }
    console.log('회원가입 성공!', password, nickName)
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | nodeBird</title>
      </Head>
      <Form onFinish={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor='user-id'>아이디</label>
          <br />
          <Input name='user-id' value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor='user-nickName'>닉네임</label>
          <br />
          <Input name='user-nickName' value={nickName} required onChange={onChangeNickName} />
        </div>
        <div>
          <label htmlFor='user-password'>비밀번호</label>
          <br />
          <Input name='user-password' value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor='user-password-check'>비밀번호 체크</label>
          <br />
          <Input 
            name='user-password-check'
            type='password'
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
        {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다</div> }
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>정보 동의 합니다.</Checkbox>
          {termError && <div style={{ color: 'red' }}>동의를 체크 해주세요</div>}
        </div>
        <div>
          <Button type='primary' htmlType="submit">가입하기</Button>
        </div>
      </Form>
    </AppLayout>
  );
}

export default Signup;
