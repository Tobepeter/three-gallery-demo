import { ModelItem } from "@/components/ModelItem";

export const Home: FC = () => {
  const mock_url = "models/dog-preview.webp";
  const mock_glb = "models/dog.glb";

  const data: ModelData[] = Array.from({ length: 20 }).map((_, i) => ({
    id: i.toString(),
    cover: mock_url,
    model: mock_glb,
  }));

  // return <Flex></Flex>;
  return (
    <div className="p-3 bg-violet-400 min-h-lvh">
      <Typography.Title>model gallery</Typography.Title>
      <Flex wrap gap="small">
        {data.map((item, idx) => (
          <ModelItem key={idx} {...item} />
        ))}
      </Flex>
    </div>
  );
};
