async function fetch_mock (api_endpoint: string, requestOptions?: any) {
  console.log("request ", api_endpoint, requestOptions?.body)
  switch (api_endpoint) {
    case "/getTickList":
      const arr = Array.from({ length: 20 }, (_, index) => index + 1)
      return Promise.resolve({
        success: true,
        data: {
          total: 25,
          list: arr.map(a => ({
            id: a,
            title: `title${a}`,
            status: "processing",
            priority: "medium",
            createTime: "2024-12-05 11:11",
            deadline: "2024-12-05 11:11",
            user: {
              id: "1",
              nickname: `user${a}`,
            }}))
        }})
    case "/getTickDetail":
      const {id} = requestOptions.body
      return Promise.resolve({
        success: true,
        data: {
          id: id,
          title: `工单${id}`,
          content: "contentcontentcontent",
          status: "processing",
          priority: "medium",
          createTime: "2024-12-05 11:11",
          deadline: "2024-12-05 11:11",
          user: {
            id: "123",
            nickname: `user${id}`,
            registerTime: "2021-01-01",
            recentTickets: [{
              id: 1,
              title: "工单1",
              status: "processing",
            },{
              id: 2,
              title: "工单2",
              status: "processing",
            },{
              id: 3,
              title: "工单3",
              status: "processing",
            }]
          },
          replies: [{
            id: 1,
            content: "reply1",
            createTime: "2024-12-05 11:11",
            operator: {
              id: 1,
              name: "wangyu"
            },
            images: ["",""],
          },{
            id: 2,
            content: "reply2",
            createTime: "2024-12-05 11:11",
            operator: {
              id: 1,
              name: "wangyu"
            }
          }]
        }}
      )
    case "/replyTicket":
      return Promise.resolve({
        success: true,
        data: {
          replyId: "1",
          createTime: "024-12-05 11:11"
        }
      })
    case "/getTemplates":
      return Promise.resolve({
        success: true,
        data: {
          personal: [{id: 1, title: "personal", content: "personalpersonal", useCount: 1}],
          public: [{id: 2, title: "public", content: "publicpublic", useCount: 1}],
        }
      })
    default:
      return Promise.reject("404")
  }
}

export default fetch_mock
