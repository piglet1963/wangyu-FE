import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Layouts from "./components/Layouts";
import TicketList from "./containers/TicketList";
import TicketDetail from "./containers/TicketDetail";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Layouts>
        <BrowserRouter>
          <Routes>
            <Route path="ticketList" element={<TicketList />}/>
            <Route path="ticketDetail/:id" element={<TicketDetail />}/>
          </Routes>
        </BrowserRouter>
      </Layouts>
    </ConfigProvider>
  );
}

export default App;
