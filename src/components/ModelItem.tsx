type ModelItemProps = ModelData & {
  onClick?: () => void;
};

export const ModelItem: FC<ModelItemProps> = (props) => {
  return (
    <Card
      hoverable
      className="hover:bg-violet-200 transition-colors"
      // TOOD: add height, if no image will very narrow
      style={{ width: 240 }}
      styles={{
        body: { padding: 0 },
      }}
      onClick={props.onClick}
      // size="small"
      // TODO: add notfound cover
      cover={<img src={props.cover} />}
    ></Card>
  );
};
