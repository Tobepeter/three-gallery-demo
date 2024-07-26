import { ModelItem } from "@/components/ModelItem";

export const Home: FC = () => {
  const mock_url = "models/dog-preview.webp";
  const mock_glb = "models/dog.glb";

  const data: IModelData[] = Array.from({ length: 20 }).map((_, i) => ({
    id: i.toString(),
    cover: mock_url,
    model: mock_glb,
  }));

  // return <Flex></Flex>;
  return (
    <div className="p-3 bg-violet-400">
      <Typography.Title>3d gallery view</Typography.Title>
      <Flex wrap gap="small">
        {data.map((item, idx) => (
          <ModelItem key={idx} {...item} />
        ))}
      </Flex>
    </div>
  );
};
