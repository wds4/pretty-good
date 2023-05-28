import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { updateCuratedListInstanceFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const ItemList = ({ aInstanceCompScoreData }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ textAlign: 'left', margin: '10px' }}>
        <div className="itemsInfoBox">
          <div style={{ color: 'grey', margin: '5px' }}>
            According to (seed user)'s grapevine, the following items belong on
            this list:
          </div>
          <hr />
          {aInstanceCompScoreData.map((oInstanceCompScoreData) => {
            const name = oInstanceCompScoreData?.name;
            const id = oInstanceCompScoreData?.id;
            const average = oInstanceCompScoreData?.average;
            const input = oInstanceCompScoreData?.input;
            const influence = oInstanceCompScoreData?.influence;
            if (input > 0.1 && average > 0.5) {
              return (
                <>
                  <div
                    className="toggleButtonParentContainer"
                    style={{ marginTop: '2px' }}
                  >
                    <div
                      className="qMarkToggleButton"
                      style={{ display: 'none' }}
                    >
                      ?
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        color: 'green',
                        marginLeft: '10px',
                      }}
                    >
                      {name}
                    </div>
                    <div className="scoresContainer">
                      <div>average: {average}</div>
                      <div>input: {input}</div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>

        <div className="itemsInfoBox">
          <div style={{ color: 'grey', margin: '5px' }}>
            The following items have been REJECTED from this list:
          </div>
          <hr />
          {aInstanceCompScoreData.map((oInstanceCompScoreData) => {
            const name = oInstanceCompScoreData?.name;
            const id = oInstanceCompScoreData?.id;
            const average = oInstanceCompScoreData?.average;
            const input = oInstanceCompScoreData?.input;
            const influence = oInstanceCompScoreData?.influence;
            if (input > 0.1 && average <= 0.5) {
              return (
                <>
                  <div
                    className="toggleButtonParentContainer"
                    style={{ marginTop: '2px' }}
                  >
                    <div
                      className="qMarkToggleButton"
                      style={{ display: 'none' }}
                    >
                      ?
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        color: 'red',
                        marginLeft: '10px',
                      }}
                    >
                      {name}
                    </div>
                    <div className="scoresContainer">
                      <div>average: {average}</div>
                      <div>input: {input}</div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>

        <div className="itemsInfoBox">
          <div style={{ color: 'grey', margin: '5px' }}>
            The following items have been submitted but not (sufficiently) vetted
            by the grapevine:
          </div>
          <hr />
          {aInstanceCompScoreData.map((oInstanceCompScoreData) => {
            const name = oInstanceCompScoreData?.name;
            const id = oInstanceCompScoreData?.id;
            const average = oInstanceCompScoreData?.average;
            const input = oInstanceCompScoreData?.input;
            const influence = oInstanceCompScoreData?.influence;
            if (input <= 0.1) {
              return (
                <>
                  <div
                    className="toggleButtonParentContainer"
                    style={{ marginTop: '2px' }}
                  >
                    <div
                      className="qMarkToggleButton"
                      style={{ display: 'none' }}
                    >
                      ?
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        color: 'black',
                        marginLeft: '10px',
                      }}
                    >
                      {name}
                    </div>
                    <div className="scoresContainer">
                      <div>average: {average}</div>
                      <div>input: {input}</div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
export default ItemList;
