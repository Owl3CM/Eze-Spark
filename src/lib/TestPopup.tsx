import React from 'react';
import { Popup, PopupMe } from './';
import { PopupPlacement } from './types';

const TestPopup = () => {
  React.useEffect(() => {
    return;
    let i = 0;
    setInterval(() => {
      const _placement = postions[i] + i;
      document.getElementById(_placement)?.click();
      i++;
      if (i > postions.length - 1) i = 0;
    }, 700);
  }, []);

  return (
    <div className='sample-grid bg-prim w-fill  h-fill'>
      {postions.map((placement, i) => {
        const _placement = placement;
        return (
          <div
            id={placement + i}
            key={i}
            className='p-l text-white text-center sample-card'
            onClick={(e) => {
              PopupMe({
                Component: Sample,
                componentProps: { placement: _placement },
                target: e.currentTarget,
                placement: _placement,
                overlay: false,
                // id: _placement,
                removeOnOutClick: true
              });
            }}
          >
            {_placement}
          </div>
        );
      })}
    </div>
  );
};

export default TestPopup;

const Sample = ({ placement }: any) => {
  return (
    <div
      className='p-4 text-white text-center'
      style={{
        width: '60vw',
        height: '60vh',
        backgroundColor: placement === 'auto' ? `#${Math.floor(Math.random() * 16777215).toString(16)}` : ColorsByPlacement[placement]
      }}
    >
      <h1>Sample</h1>
      <p>{placement}</p>
    </div>
  );
};
const ColorsByPlacement: {
  [key: string]: string;
} = {
  center: '#2d3748',
  'top-left': '#e53e3e',
  'top-right': '#38a169',
  'bottom-left': '#4299e1',
  'bottom-right': '#ed8936',
  top: '#667eea',
  bottom: '#ed64a6',
  left: '#ed8936',
  right: '#ed8936',
  auto: `#${Math.floor(Math.random() * 16777215).toString(16)}`
};

const postions: PopupPlacement[] = [
  //
  'auto',
  'auto',
  'auto',

  'bottom',
  'top',
  'center',

  'left',
  'left',
  'left',

  'right',
  'right',
  'right',

  'top-left',
  'top-left',
  'top-left',

  'bottom-left',
  'bottom-left',
  'bottom-left',

  'auto',
  'auto',
  'auto',

  'bottom-right',
  'bottom-right',
  'bottom-right',

  'top-right',
  'top-right',
  'top-right',

  'left',
  'right',
  'bottom',
  'top',
  'center',

  'auto',
  'auto',
  'auto'
];
