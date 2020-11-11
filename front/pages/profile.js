import React from 'react';
import Head from 'next/head';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const followingList = [{ nickname: 'nd1' }, { nickname: 'nd2' }, { nickname: 'nd3' }];
  const followerList = [{ nickname: 'nd4' }, { nickname: 'nd5' }, { nickname: 'nd6' }];

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | nodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
}

export default Profile;
