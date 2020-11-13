import React from 'react';
import s from './style.module.less';
import background1 from './backgrounds/01.svg';
import background2 from './backgrounds/02.svg';
import background3 from './backgrounds/03.svg';
import background4 from './backgrounds/04.svg';

const BACKGROUNDS = [background1, background2, background3, background4];

export default () => {
  return (
    <img
      alt=""
      className={s.background}
      src={BACKGROUNDS[Math.round((BACKGROUNDS.length - 1) * Math.random())]}
    />
  );
};
