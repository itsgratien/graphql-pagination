import React from 'react';
import { useQuery } from '@apollo/client';
import * as Types from '__generated__';
import style from './Style.module.scss';
import classname from 'classnames';
import { ListItems } from './ListItems';

export const Numbers = () => {
  const [page, setPage] = React.useState<number>(1);

  const [users, setUsers] = React.useState<Types.TUser[]>();

  const [loading, setLoading] = React.useState<boolean>(true);

  const [total, setTotal] = React.useState<number>();

  const limit = 8;

  const { fetchMore } = useQuery<
    Types.TGetAllUserResponse,
    Types.TGetAllUserVariable
  >(Types.GET_ALL_USER_GQL, {
    variables: { limit, page },
    onCompleted: (res) => {
      if (res.getAllUser) {
        setUsers(res.getAllUser.data);
        setTotal(res.getAllUser.total);
        setLoading(false);
      }
    },
    onError: () => {
      setLoading(false);
    },
  });

  if (!users) {
    return null;
  }
  return (
    <div className={classname('relative', style.component)}>
      <ListItems items={users} loading={loading} />
    </div>
  );
};
