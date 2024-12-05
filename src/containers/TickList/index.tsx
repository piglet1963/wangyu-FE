import React, {useState} from "react";
import {TicketListItemType} from "../../service/api/tickets";
import { Menu, Spin } from 'antd';
import type { MenuProps } from 'antd';


export default function TickList() {
  const [current, setCurrent] = useState<'pending' | 'processing' | 'completed'>('pending');

  const onClick = (e:any) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: 'pending',
      key: 'pending'
    },
    {
      label: 'processing',
      key: 'processing'
    },
    {
      label: 'completed',
      key: 'completed'
    },
  ]


  return <div>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
   <div></div>
  </div>
}


function TickItem(props: {data: TicketListItemType}) {

}
