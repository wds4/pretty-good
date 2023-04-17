import React, { useEffect } from 'react';
import { NostrProvider } from 'nostr-react';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import './css/devMode2Off.css';

const DevMode2Off = () => {
  return (
    <AppRoutes />
  );
};

export default DevMode2Off;
