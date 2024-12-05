import {TicketListItemType} from "../../service/api/tickets";
import React from "react";
import {Badge} from "antd";

export default function TicketItemContent(props: {data: {
    id: string;
    title: string;
    status: string;
    priority?: string;
    createTime?: string;
    deadline?: string;
    user?: {
      id: string;
      nickname: string;
    };
  }}) {
  const {data} = props

  const badges: {[keys: string]: React.ReactNode} = {
    "pending": <Badge status="default" text="待处理"/>,
    "processing": <Badge status="processing" text="处理中"/>,
    "completed": <Badge status="success" text="已完成"/>,
    "high": <Badge status="error" text="高"/>,
    "medium": <Badge status="warning" text="中"/>,
    "low": <Badge status="default" text="低"/>
  }

  return <>
    {data.user?<p>用户：{data.user?.nickname}</p>:null}
    <div>{data.priority ? badges[data.priority] : null} {badges[data.status]}</div>
    {data.createTime?<p>创建时间: {data.createTime}</p>:null}
    {data.deadline?<p>截止时间: {data.deadline}</p>:null}
  </>
}
