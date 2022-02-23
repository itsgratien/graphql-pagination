import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { Numbers, LoadMore, InfiniteScroll, Header } from 'components';
import { RoutePaths } from 'utils';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={RoutePaths.Home} element={<Numbers />} />
        <Route path={RoutePaths.LoadMore} element={<LoadMore />} />
        <Route path={RoutePaths.InfiniteScroll} element={<InfiniteScroll />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
