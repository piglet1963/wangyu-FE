import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Layouts from "./components/Layouts";
import TickList from "./containers/TickList";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Layouts>
        <BrowserRouter>
          <Routes>
            <Route path="tickList" element={<TickList />}/>
          </Routes>
        </BrowserRouter>
      </Layouts>
    </ConfigProvider>
  );
}

export default App;
