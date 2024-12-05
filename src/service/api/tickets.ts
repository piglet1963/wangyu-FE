import fetchService from "../service";

export interface TicketListItemType {
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

export interface TicketDetailType  extends TicketListItemType {
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

export interface ReplyTicketRequest {
  ticketId: string;
  content: string;
  images?: string[];
  templateId?: string;
  status?: string;
}

interface GetTemplatesResponse {
  success: boolean;
  data?: {
    personal: Array<{
      id: string;
      title: string;
      content: string;
      useCount: number;
    }>;
    public: Array<{
      id: string;
      title: string;
      content: string;
      useCount: number;
    }>; };
}


export default {
  getTicketList: (payload: TicketListRequest) => {
    return fetchService.post<{ success: boolean; data?: {total: number; list: TicketListItemType[] }}>( `/getTickList`, payload)
  },
  getTicketDetail: (id: number) => {
    return fetchService.post<{ success: boolean; data?: TicketDetailType}>( `/getTickDetail`, {id})
  },
  reply: (payload: ReplyTicketRequest) => {
    return fetchService.post<{ success: boolean; data?: {replyId: string; createTime: string}}>( `/replyTicket`, payload)
  },
  getTemplates: () => {
    return fetchService.post<GetTemplatesResponse>( `/getTemplates`)
  }
}
