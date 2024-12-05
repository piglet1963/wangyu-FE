import React from "react";
import {useParams} from "react-router";
import {Card, Divider, Result, Spin} from "antd"
import styles from "./styles.module.scss"
import {useRequest} from "ahooks";
import ticketsApi, {TicketDetailType, TicketListItemType, TicketListRequest} from "../../service/api/tickets";
import TicketItemContent from "../../components/TicketItemContent";
import ReplyEditor from "../../components/ReplyEditor";

export default function TicketDetail() {
  const {id} = useParams()

  // @ts-ignore
  const {run: getTicketDetail, loading, data: ticketDetailRes} = useRequest<{ success: boolean; data?: TicketDetailType}, [number]>(ticketsApi.getTicketDetail, {
    defaultParams: [id],
    onError: (e) => {
      alert("获取工单详情失败")
    }
  })

  if(!id) {
    return <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  }

  return <Spin spinning={loading}>
    {ticketDetailRes?.data?<div className={styles.content}>
      <div className={styles.flex}>
        <h2>工单详情</h2>
        <h3>{ticketDetailRes.data.title}</h3>
        {<TicketItemContent data={ticketDetailRes.data} />}
        <Divider />
        <h2>相关工单</h2>
        <div className={styles.relates}>
          {ticketDetailRes.data.user.recentTickets ?
            ticketDetailRes.data.user.recentTickets.map(re =>
              <Card key={`relate_${re.id}`}
                    title={re.title}
                    className={styles.relateCards}
                    extra={<a href={`/ticketDetail/${re.id}`} target="_blank">查看</a>}
              >
                <TicketItemContent data={re} />
              </Card>)
            : "暂无相关工单"}
        </div>
      </div>
      <div className={styles.flex}>
        <h2>处理</h2>
        {ticketDetailRes.data.status!=="completed"?<ReplyEditor ticketId={ticketDetailRes.data.id} onReply={() => {alert("回复成功")}}/>:"已处理完成"}
        <Divider/>
        <h2>历史记录</h2>
      </div>
    </div>:null}
  </Spin>
}
