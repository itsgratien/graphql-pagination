import React from 'react';
import { useQuery } from '@apollo/client';
import * as Types from '__generated__';
import style from './Style.module.scss';
import classname from 'classnames';
import { ListItems } from './ListItems';

export const LoadMore = () => {
  const [page, setPage] = React.useState<number>(1);

  const [users, setUsers] = React.useState<Types.TUser[]>();

  const [loading, setLoading] = React.useState<boolean>(true);

  const [total, setTotal] = React.useState<number>();

  const limit = 8;

  const { fetchMore } = useQuery<
    any,
    Types.TGetAllUserVariable
  >(Types.FETCH_MORE_USER_GQL, {
    variables: { limit, page },
    onCompleted: (res) => {
      if (res.fetchMoreUser) {
        setUsers(res.fetchMoreUser.data);
        setTotal(res.fetchMoreUser.total);
        setLoading(false);
      }
    },
    onError: () => {
      setLoading(false);
    },
  });

  const handleFetchMore = () => {
    const nextPage = page + 1;
    fetchMore({ variables: { page: nextPage, limit } });
    setPage(nextPage);
  };

  if (!users) {
    return null;
  }
  return (
    <div className={classname('relative', style.component)}>
      <div className={style.componentContainer}>
        <ListItems items={users} loading={loading} total={total} />
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
