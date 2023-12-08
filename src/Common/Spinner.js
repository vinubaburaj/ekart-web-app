import React from 'react';
import {css} from '@emotion/react';
import {SyncLoader} from 'react-spinners';
import './Spinner.css';

const override = css`
  display: block;
  margin: 0 auto;
`;

const Spinner = () => {
  return (
      <div className="spinner-container">
        <SyncLoader css={override} size={10} color={'#36D7B7'}/>
      </div>
  );
};

export default Spinner;