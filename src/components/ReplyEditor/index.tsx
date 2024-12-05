import React, {useCallback, useState} from "react";
import {Input, Upload, Button, message, Select} from "antd";
import styles from "./styles.module.scss"
import {useRequest} from "ahooks";
import ticketsApi, {ReplyTicketRequest, TicketDetailType} from "../../service/api/tickets";

export default function ReplyEditor(props: {
  ticketId: string;
  onReply: () => void;
}) {
  const {ticketId} = props
  const [text, setText] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [templateId, setTemplateId] = useState<string>();
  const [ticketStatus, setTicketStatus] = useState<'processing' | 'completed'>("processing");

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const beforeUpload = async (file: File): Promise<boolean> => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      alert("请选择图片")
      return false;
    }

    try {
      const base64 = await getBase64(file);
      setImages((prevImages) => [...prevImages, base64]);
    } catch (error) {
      message.error("图片转换失败");
    }
    return false;
  };

  // @ts-ignore
  const {runAsync: reply} = useRequest<{ success: boolean}, [ReplyTicketRequest]>(ticketsApi.reply, {
    manual: true,
    retryCount: 3,
    onError: (e) => {
      alert("回复失败")
    }
  })

  // @ts-ignore
  const {run: getTemplates, loading, data: templatesRes} = useRequest<GetTemplatesResponse, []>(ticketsApi.getTicketDetail, {})

  const handleSubmit = useCallback(() => {
    reply({ticketId, content: text, images, templateId, status: ticketStatus})
      .then(res => {
        alert("回复成功")
      })
  }, [text, images, ticketStatus, templateId, ticketId])

  return (
    <div>
      <Input.TextArea rows={5} placeholder="请输入回复" value={text} onChange={(e) => setText(e.target.value)}/>
      {templatesRes?.data ?<Select
        placeholder={"选择快捷回复"}
        value={templateId}
        style={{width: "100%"}}
        onChange={setTemplateId}
        options={[
          {
            label: <span>个人</span>,
            title: '个人',
            options: templatesRes.data.personal?.map((p: any) => ({label: p.title, value: p.id})),
          },
          {
            label: <span>公用</span>,
            title: '公用',
            options: templatesRes.data.public?.map((p: any) => ({label: p.title, value: p.id})),
          },
        ]}/> : null}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: 20,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`preview-${index}`}
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ))}
        <Upload
          listType="picture-card"
          beforeUpload={beforeUpload}
          showUploadList={false}
          multiple
        >
          <div>
            <div style={{ marginTop: 8 }}>+选择图片</div>
          </div>
        </Upload>
      </div>
      <div className={styles.handle}>
        <div>
          <span>处理状态：</span>
          <Select
            value={ticketStatus}
            style={{ width: 120 }}
            onChange={setTicketStatus}
            options={[
              { value: 'processing', label: '处理中' },
              { value: 'completed', label: '已完成' },
            ]}
          />
        </div>
        <Button type="primary" onClick={handleSubmit} style={{ marginTop: 20 }} loading={loading}>
          提交
        </Button>
      </div>
    </div>
  );
}
