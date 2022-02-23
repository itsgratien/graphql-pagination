import React from 'react';
import style from './Style.module.scss';
import classname from 'classnames';

export const FixedBottom: React.FC = ({ children }) => {
  return (
    <div className={classname('fixed bottom-0 left-0 right-0 bg-white', style.fixedBottom)}>
      {children}
    </div>
  );
};
