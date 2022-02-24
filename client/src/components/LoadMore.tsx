import React from 'react';
import { useQuery } from '@apollo/client';
import * as Types from '__generated__';
import style from './Style.module.scss';
import classname from 'classnames';
import { ListItems } from './ListItems';

export const LoadMore = () => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const [disable, setDisable] = React.useState<boolean>(false);

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

  React.useEffect(() => {
    if (data) {
      const total = Number(data.fetchMoreUser.total);
      if (total <= limit) {
        setDisable(true);
      } else {
        const totalPage = total / limit;

        if (totalPage === data.fetchMoreUser.page) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      }
    }
  }, [data]);

  if (!data || !data.fetchMoreUser) {
    return null;
  }

  return (
    <div className={classname('relative', style.component)}>
      <div className={style.componentContainer}>
        <ListItems
          items={data.fetchMoreUser.data}
          loading={loading}
          total={data.fetchMoreUser.total}
        />
        <div>
          <button
            type="button"
            className={classname(
              'outline-none focus:outline-none bg-black text-white p-3 font-bold rounded-full text-xs',
              disable ? 'opacity-20' : 'opacity-100'
            )}
            onClick={handleFetchMore}
            disabled={disable}
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};
