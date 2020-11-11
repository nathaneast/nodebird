import React from 'react';
import Proptypes from 'prop-types';
import Head from 'next/head';
import withReduxSaga from 'next-redux-saga';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const NodeBird = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>NodeBird</title>
    </Head>
    <Component />
  </>
);

NodeBird.prototype = {
  Component: Proptypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(NodeBird));
