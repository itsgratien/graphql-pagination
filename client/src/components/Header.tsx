import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { RoutePaths } from 'utils';
import classname from 'classnames';
import style from './Style.module.scss';

export const Header = () => {
  const [activeLi, setActiveLi] = React.useState<string>();

  const location = useLocation();

  React.useEffect(() => {
    switch (location.pathname) {
      case RoutePaths.Home:
        setActiveLi(RoutePaths.Home);
        break;
      case RoutePaths.LoadMore:
        setActiveLi(RoutePaths.LoadMore);
        break;
      case RoutePaths.InfiniteScroll:
        setActiveLi(RoutePaths.InfiniteScroll);
        break;
      default:
        setActiveLi(undefined);
    }
  }, [location]);

  return (
    <div className={classname(style.lists, 'fixed left-0 right-0 top-0 z-40 bg-black')}>
      <ul className={classname('flex items-center justify-center')}>
        <li
          className={classname(
            activeLi === RoutePaths.Home ? style.active : ''
          )}
        >
          <Link to={RoutePaths.Home}>Numbers</Link>
        </li>
        <li
          className={classname(
            activeLi === RoutePaths.LoadMore ? style.active : ''
          )}
        >
          <Link to={RoutePaths.LoadMore}>fetch more</Link>
        </li>
        <li
          className={classname(
            activeLi === RoutePaths.InfiniteScroll ? style.active : ''
          )}
        >
          <Link to={RoutePaths.InfiniteScroll}>Infinite scroll</Link>
        </li>
      </ul>
    </div>
  );
};
