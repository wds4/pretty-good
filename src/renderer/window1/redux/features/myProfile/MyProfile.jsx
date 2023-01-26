import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './myProfileSlice';
import styles from './MyProfile.module.css';

export default function MyProfile() {
  const count = useSelector((state) => state.myProfile.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          type="button"
          aria-label="Increment myProfile value"
          onClick={() => dispatch(increment())}
        >
          Increment myProfile
        </button>
        <span>{count}</span>
        <button
          type="button"
          aria-label="Decrement myProfile value"
          onClick={() => dispatch(decrement())}
        >
          Decrement myProfile
        </button>
      </div>
    </div>
  );
}
