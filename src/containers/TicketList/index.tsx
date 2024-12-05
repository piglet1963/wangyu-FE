import React, { useEffect, useState} from "react";
import {TicketListItemType, TicketListRequest} from "../../service/api/tickets";
import {Menu, Spin, Input, Select, Col, Row, Card, Badge, Pagination} from 'antd';
import {useRequest} from "ahooks";
import ticketsApi from "../../service/api/tickets";
import styles from "./styles.module.scss"
import TicketItemContent from "../../components/TicketItemContent";
const PAGE_SIZE = 20
export default function TicketList() {
  const [statusTab, setStatusTab] = useState<'pending' | 'processing' | 'completed' | 'all'>('all');

  const onClick = (e:any) => {
    setStatusTab(e.key);
  };

  const items = [
    {label: '全部', key: 'all'},
    {label: '待处理', key: 'pending'},
    {label: '处理中', key: 'processing'},
    {label: '已完成', key: 'completed'}
  ]

  return <div className={styles.content}>
    <Menu onClick={onClick} selectedKeys={[statusTab]} mode="horizontal" items={items} />
   <List ticketStatus={statusTab==="all"? undefined : statusTab} key={statusTab}/>
  </div>
}

function List(props: {ticketStatus?: 'pending' | 'processing' | 'completed'}) {
  const {ticketStatus} = props
  const [keyword, setKeyword] = useState("")
  const [page, setPage] = useState(1)
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>("high")

  // @ts-ignore
  const {run: getTicketList, loading, data: ticketListRes} = useRequest<{ success: boolean; data?: {total: number; list: TicketListItemType[] }}, [TicketListRequest]>(ticketsApi.getTicketList, {
    debounceWait: 300,
    defaultParams: [{keyword, page, pageSize: PAGE_SIZE, status: ticketStatus, priority}],
    onError: (e) => {
      alert("获取工单列表失败")
    }
  })

  useEffect(() => {
    getTicketList({page, pageSize: PAGE_SIZE, keyword, priority, status: ticketStatus})
  }, [page, keyword, priority, ticketStatus])

  return <div>
    <div className={styles.flexbox}>
      <Input placeholder="输入搜索" onChange={(e) => {setKeyword(e.target.value)}} style={{width: "400px"}}/>
      <div>
        <span>优先级：</span>
        <Select
          value={priority}
          style={{ width: 120 }}
          onChange={setPriority}
          options={[
            { value: 'high', label: '高' },
            { value: 'medium', label: '中' },
            { value: 'low', label: '低' },
          ]}
        />
      </div>
    </div>
    <Spin spinning={loading}>
      <Row gutter={[16, 16]} className={styles.list}>
        {ticketListRes?.data?.list?.map(l => <Col span={6} key={`ticket_${l.id}`}>
          <TicketItem data={l}/>
        </Col>)}
      </Row>
      <div className={styles.pagination}>
        <Pagination pageSize={PAGE_SIZE} current={page} total={ticketListRes?.data?.total} onChange={setPage}/>
      </div>
    </Spin>
  </div>
}

function TicketItem(props: {data: TicketListItemType}) {
  const {data} = props
  return <Card title={data.title} extra={<a href={`/ticketDetail/${data.id}`} target="_blank">{data.status==="completed" ? "查看":"处理"}</a>}>
    <TicketItemContent data={data} />
  </Card>
}
