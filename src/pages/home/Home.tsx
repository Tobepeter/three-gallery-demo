import { ModelItem } from '@/components/ModelItem';
import { ModelPreview } from '@/components/ModelPreview';
import { CheckboxOptionType, Radio } from 'antd';

export const Home: FC = () => {
  const mock_url = 'models/dog.webp';
  const mock_glb = 'models/dog.glb';

  const mock_url2 = 'models/girl.webp';
  const mock_glb2 = 'models/girl.glb';

  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);

  const data: ModelData[] = Array.from({ length: 20 }).map((_, i) => {
    const cover = i % 2 === 0 ? mock_url : mock_url2;
    const model = i % 2 === 0 ? mock_glb : mock_glb2;
    return {
      id: i.toString(),
      cover,
      model,
    };
  });

  return (
    <div className="p-3 bg-violet-400 min-h-lvh">
      <Typography.Title>model gallery</Typography.Title>
      {/* TODO: add flex wrap anim when have time */}
      <Flex wrap gap="small">
        {data.map((item, idx) => (
          <ModelItem
            key={idx}
            {...item}
            onClick={() => {
              setSelectedModel(item);
            }}
          />
        ))}
      </Flex>

      {/* -- model preview -- */}
      {selectedModel && (
        <ModelPreview
          {...selectedModel}
          onClose={() => {
            setSelectedModel(null);
          }}
        />
      )}
    </div>
  );
};
