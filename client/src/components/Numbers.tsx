import React from 'react';
import { useQuery } from '@apollo/client';
import * as Types from '__generated__';
import style from './Style.module.scss';
import classname from 'classnames';
import { ListItems } from './ListItems';
import Select from 'react-select';
import { FixedBottom } from './FixedBottom';
import ReactPaginate from 'react-paginate';

export const Numbers = () => {
  const [page, setPage] = React.useState<number>(1);

  const [loading, setLoading] = React.useState<boolean>(true);

  const [users, setUsers] = React.useState<Types.TUser[]>();

  const [total, setTotal] = React.useState<number>();

  const limit = 10;

  useQuery<
    Types.TGetAllUserResponse,
    Types.TGetAllUserVariable
  >(Types.GET_ALL_USER_GQL, {
    variables: { limit, page },
    onCompleted: (res) => {
      if (res.getAllUser) {
        setLoading(false);
        setUsers(res.getAllUser.data);
        setTotal(res.getAllUser.total);
      }
    },
    onError: () => {
      setLoading(false);
    },
  });

  const handleTotal = () => {
    const num = [];
    if (total) {
      for (let i = 1; i < total / limit; i++) {
        num.push({ value: i, label: i });
      }
    }
    return num;
  };

  if (!users) {
    return null;
  }

  return (
    <div className={classname('relative', style.component)}>
      <div className={style.componentContainer}>
        <div style={{ width: '300px', marginBottom: '20px' }}>
          <Select
            options={handleTotal()}
            onChange={(e) => setPage(e ? Number(e.value) : 1)}
            value={{ label: page, value: page }}
            isSearchable
            className="customSelect"
          />
        </div>
        <ListItems
          items={users}
          loading={loading}
          total={total}
        />
      </div>
      <FixedBottom>
        {total && (
          <div className={style.reactPaginate}>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={(val: any) => {
                const cal = val.selected + 1;
                setPage(cal);
                setLoading(true);
              }}
              pageRangeDisplayed={5}
              pageCount={Number(total / limit)}
              previousLabel="<"
              activeClassName={style.selected}
            />
          </div>
        )}
      </FixedBottom>
    </div>
  );
};
