import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import MiniProfile from "./miniProfile";

const rotate360 = keyframes`
from {
   transform: rotate(0deg);
  }

 to {
   transform: rotate(360deg);
    }
`;

export const CustomLoader = ({pubkey}) => {
  const [loader, setLoader] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (loader) {
    return (
      <>
        <div style={{ padding: '24px' }}>
          <center>
            <Spinner />
            <div>Loading seed profile data ...</div>
          </center>
        </div>
      </>
    );
  }
  return (
    <>
      <MiniProfile pubkey={pubkey} />
    </>
  );
};

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const MiniProfileSpinner = ({pubkey}) => {

  return (
    <>
      <div style={{}}>
        <CustomLoader pubkey={pubkey} />
      </div>
    </>
  );
};
export default MiniProfileSpinner;
