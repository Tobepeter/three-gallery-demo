import { ModelItem } from "@/components/ModelItem";

export const Home: FC = () => {
  // return <div className="text-red">Home</div>;
  // return <ModelItem url="" />;

  const url =
    "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/3c4d5297-1e5f-4dd7-8f8f-994881d31583/rendered_image.webp?auth_key=1721985179-j6seXzMORbI-0-fcc1b83a6a8c1bfc7103ecd5f455343b";

  const data = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    url,
  }));

  // return <Flex></Flex>;
  return (
    <div className="p-3 bg-violet-400">
      <Typography.Title>3d gallery view</Typography.Title>
      <Flex wrap gap="small">
        {data.map((item) => (
          <ModelItem key={item.id} url={item.url} />
        ))}
      </Flex>
    </div>
  );
};
