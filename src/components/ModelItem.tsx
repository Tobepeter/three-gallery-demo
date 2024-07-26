export interface ModelItemProps {
  url: string;
}

export const ModelItem: FC<ModelItemProps> = (props) => {
  const url = props.url;
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      styles={{
        body: { padding: 0 },
      }}
      size="small"
      cover={<img src={url} />}
    ></Card>
  );
};
