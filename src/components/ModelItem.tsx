export const ModelItem: FC<IModelData> = (props) => {
  return (
    <Card
      hoverable
      // TOOD: add height, if no image will very narrow
      style={{ width: 240 }}
      styles={{
        body: { padding: 0 },
      }}
      size="small"
      // TODO: add notfound cover
      cover={<img src={props.cover} />}
    ></Card>
  );
};
