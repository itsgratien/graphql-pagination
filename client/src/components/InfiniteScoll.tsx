import React from 'react';
import { useQuery } from '@apollo/client';
import * as Types from '__generated__';
import style from './Style.module.scss';
import classname from 'classnames';
import { ListItems } from './ListItems';
import Scroll from 'react-infinite-scroller';

export const InfiniteScroll = () => {
  const limit = 10;

  const { fetchMore, data } = useQuery<
    Types.TFetchMoreResponse,
    Types.TGetAllUserVariable
  >(Types.FETCH_MORE_USER_GQL, {
    variables: { limit, page: 1 },
  });

  const handleFetchMore = (val: number) => {
    if (data && data.fetchMoreUser && data.fetchMoreUser.page) {
      fetchMore({ variables: { page: val, limit } });
    }
  };

  if (!data || !data.fetchMoreUser) {
    return null;
  }

  return (
    <div className={classname('relative', style.component)}>
      <div className={style.componentContainer}>
        <Scroll
          pageStart={0}
          loadMore={handleFetchMore}
          hasMore={data.fetchMoreUser.data.length !== data.fetchMoreUser.total}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
        >
          <ListItems
            items={data.fetchMoreUser.data}
            total={data.fetchMoreUser.total}
          />
        </Scroll>
      </div>
    </div>
  );
};
