import React from 'react';
import style from './App.module.scss';
import classname from 'classnames';

const App = () => {
  return (
    <div className={classname('container mx-auto', style.app)}>
      <span className="font-bold">welcome</span>
    </div>
  );
};

export default App;
