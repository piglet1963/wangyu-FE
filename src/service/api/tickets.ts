import fetchService from "../service";

export type TicketListItemType = {
  id: string;
  title: string;
  status: string;
  priority: string;
  createTime: string;
  deadline: string;
  user: {
    id: string;
    nickname: string;
  };
}

export type RecentTicketType = {
  id: string;
  title: string;
  status: string;
}

export type RecentReply = {
  id: string;
  content: string;
  createTime: string;
  operator: {
    id: string;
    name: string;
  };
  images?: string[];
}

export type TicketDetailType = {
  id: string;
  title: string;
  content: string;
  status: string;
  priority: string;
  createTime: string;
  deadline: string;
  user: {
    id: string;
    nickname: string;
    registerTime: string;
    recentTickets: RecentTicketType[];
    replies: RecentReply[];
  }
}

export type TicketListRequest = {
  page: number;
  pageSize: number;
  status?: 'pending' | 'processing' | 'completed';
  priority?: 'high' | 'medium' | 'low';
  keyword?: string;
}

export default {
  getTicketList: (payload: TicketListRequest) => {
    return fetchService.get<{ success: boolean; data?: {total: number; list: TicketListItemType[] }}>( `/getTickList`, payload)
  },
  getTicketDetail: (id: number) => {
    return fetchService.get<{ success: boolean; data?: TicketDetailType}>( `/getTickDetail`, {id})
  },
}
