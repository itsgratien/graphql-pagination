import React from 'react';
import { useQuery } from '@apollo/client';
import * as Types from '__generated__';
import style from './Style.module.scss';
import classname from 'classnames';
import { ListItems } from './ListItems';
import Select from 'react-select';
import { FixedBottom } from './FixedBottom';

export const Numbers = () => {
  const [page, setPage] = React.useState<number>(1);

  const [users, setUsers] = React.useState<Types.TUser[]>();

  const [loading, setLoading] = React.useState<boolean>(true);

  const [total, setTotal] = React.useState<number>();

  const limit = 10;

  const handleTotal = () => {
    const num = [];
    if (total) {
      for (let i = 1; i < total / limit; i++) {
        num.push({ value: i, label: i });
      }
    }
    return num;
  };

  useQuery<Types.TGetAllUserResponse, Types.TGetAllUserVariable>(
    Types.GET_ALL_USER_GQL,
    {
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
    }
  );

  if (!users) {
    return null;
  }

  return (
    <div className={classname('relative', style.component)}>
      <div className={style.componentContainer}>
        <ListItems items={users} loading={loading} total={total} />
      </div>
      <FixedBottom>
        <div style={{ width: '300px' }} className="mx-auto">
          <Select
            options={handleTotal()}
            onChange={(e) => setPage(e ? Number(e.value) : 1)}
            value={{ label: page, value: page }}
            isSearchable
            className="customSelect"
          />
        </div>
      </FixedBottom>
    </div>
  );
};
