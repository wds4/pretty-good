import React, { useEffect } from 'react';
import { NostrProvider } from 'nostr-react';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import './css/devMode2On.css';

const DevMode2On = () => {
  return (
    <AppRoutes />
  );
};

export default DevMode2On;
