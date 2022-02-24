import React from 'react';
import { useQuery } from '@apollo/client';
import * as Types from '__generated__';
import style from './Style.module.scss';
import classname from 'classnames';
import { ListItems } from './ListItems';
import Scroll from 'react-infinite-scroller';

export const InfiniteScroll = () => {
  const pageStart = 1;

  const limit = 10;

  const { fetchMore, data } = useQuery<
    Types.TLoadUsersInfinitelyResponse,
    Types.TGetAllUserVariable
  >(Types.LOAD_USER_INFINITE_GQL, {
    variables: { limit, page: pageStart }
  });

  const handleFetchMore = (val: number) => {
    if (data && data.loadUsersInfinitely && data.loadUsersInfinitely.page) {
      fetchMore({ variables: { page: val, limit } });
    }
  };

  if (!data || !data.loadUsersInfinitely) {
    return null;
  }

  return (
    <div className={classname('relative', style.component)}>
      <div className={style.componentContainer}>
        <Scroll
          pageStart={0}
          loadMore={handleFetchMore}
          hasMore={
            data.loadUsersInfinitely.data.length !==
            data.loadUsersInfinitely.total
          }
          loader={
            <div
              className="loader text-sm font-bold"
              key={0}
              style={{ color: '#fba200' }}
            >
              Loading ...
            </div>
          }
          useWindow={false}
        >
          <ListItems
            items={data.loadUsersInfinitely.data}
            total={data.loadUsersInfinitely.total}
          />
        </Scroll>
      </div>
    </div>
  );
};
