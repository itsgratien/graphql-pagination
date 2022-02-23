import React from 'react';
import * as Types from '__generated__';
import style from './Style.module.scss';

type Props = {
  item: Types.TUser;
};

export const ListItem = ({ item }: Props) => {
  return (
    <li key={item.id} className={style.listItem}>
      <span className="block text-xs font-bold">{item.name}</span>
      <small className="text-xs">{item.email}</small>
    </li>
  );
};
