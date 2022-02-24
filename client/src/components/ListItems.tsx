import React from 'react';
import * as Types from '__generated__';
import { ListItem } from './ListItem';

type Props = {
  items?: Types.TUser[];
  loading?: boolean;
  total?: number;
};

export const ListItems = ({ items, loading, total }: Props) => {
  if (!items) {
    return null;
  }
  return (
    <>
      {loading && <small className="text-xs">Loading ...</small>}
      <div>
        <small style={{ color: '#fba200' }}>
          <b>{total}</b> results
        </small>
      </div>
      <div>
        <ul>
          {items.map((item, itemKey) => (
            <ListItem item={item} key={itemKey} />
          ))}
        </ul>
      </div>
    </>
  );
};
