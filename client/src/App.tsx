import React from 'react';
import style from './App.module.scss';
import classname from 'classnames';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { Numbers, LoadMore, InfiniteScroll, Header } from 'components';
import { RoutePaths } from 'utils';

const App = () => {
  return (
    <div className={classname('container mx-auto', style.app)}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={RoutePaths.Home} element={<Numbers />} />
          <Route path={RoutePaths.LoadMore} element={<LoadMore />} />
          <Route
            path={RoutePaths.InfiniteScroll}
            element={<InfiniteScroll />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
