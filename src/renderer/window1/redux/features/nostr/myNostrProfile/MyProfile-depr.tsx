import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './slice';

export default function MyProfile() {
  const count = useSelector((state) => state.myNostrProfile.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          type="button"
          aria-label="Increment myNostrProfile value"
          onClick={() => dispatch(increment())}
        >
          Increment myNostrProfile
        </button>
        <span>{count}</span>
        <button
          type="button"
          aria-label="Decrement myNostrProfile value"
          onClick={() => dispatch(decrement())}
        >
          Decrement myNostrProfile
        </button>
      </div>
    </div>
  );
}
