import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import facebookIcon from './icons/facebook-brands.svg';
import instagramIcon from './icons/instagram-brands.svg';
import twitterIcon from './icons/twitter-brands.svg';

const icons = {
  Facebook: facebookIcon,
  Instagram: instagramIcon,
  Twitter: twitterIcon,
};

export default ({ link, label, className, icon, iconSize }) => (
  <a
    target="_blank"
    rel="noreferrer"
    href={link}
    aria-label={label}
    className={cN(s.button, className, s['button' + iconSize])}
    dangerouslySetInnerHTML={{ __html: icons[icon] }}
  />
);
