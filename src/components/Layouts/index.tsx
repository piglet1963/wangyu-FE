import React from "react";
import {Layout } from 'antd';
import styles from "./styles.module.scss"
const { Header, Content, Footer } = Layout;

export default function Layouts(props: {children: React.ReactNode}) {
  return <Layout>
    <Header className={styles.header}>
      <p>王玉</p>
      <div>
        <a href="">统计分析</a>
      </div>
    </Header>
    <Content className={styles.content}>
      {props.children}
    </Content>
    <Footer className={styles.footer}>
      王玉-FE
    </Footer>
  </Layout>
}
