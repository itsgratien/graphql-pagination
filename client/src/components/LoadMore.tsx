import React from 'react';
import { useQuery } from '@apollo/client';
import * as Types from '__generated__';
import style from './Style.module.scss';
import classname from 'classnames';
import { ListItems } from './ListItems';

export const LoadMore = () => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const limit = 10;

  const { fetchMore, data } = useQuery<
    Types.TFetchMoreResponse,
    Types.TGetAllUserVariable
  >(Types.FETCH_MORE_USER_GQL, {
    variables: { limit, page: 1 },
    onCompleted: (res) => {
      if (res.fetchMoreUser) {
        setLoading(false);
      }
    },
    onError: () => {
      setLoading(false);
    },
  });

  const handleFetchMore = () => {
    if (data && data.fetchMoreUser && data.fetchMoreUser.page) {
      const nextPage = data.fetchMoreUser.page + 1;
      fetchMore({ variables: { page: nextPage, limit } });
    }
  };

  if (!data  || !data.fetchMoreUser) {
    return null;
  }
  return (
    <div className={classname('relative', style.component)}>
      <div className={style.componentContainer}>
        <ListItems items={data.fetchMoreUser.data} loading={loading} total={data.fetchMoreUser.total} />
        <div>
          <button
            type="button"
            className={classname(
              'outline-none focus:outline-none bg-black text-white p-3 font-bold rounded-full text-xs'
            )}
            onClick={handleFetchMore}
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};
