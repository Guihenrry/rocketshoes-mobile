import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Routes from './routes';

console.tron.log('Log');

export default function src() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#141419" />
      <Routes />
    </>
  );
}
