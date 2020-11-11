import React, { useMemo } from 'react';
import { Form, Input } from 'antd';

const NicknameEditForm = () => {
  const style = useMemo(() => ({ 
    marginBottom: '28PX', 
    border: '1px solid black',
    padding: '20px',
  }), []);

  return (
    <Form style={style}>
      <Input.Search  addonBefore="닉네임" enterButton="수정" />
    </Form>
  );
}

export default NicknameEditForm;
