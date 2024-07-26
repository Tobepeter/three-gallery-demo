import { ModelItem } from '@/components/ModelItem';
import { ModelPreview } from '@/components/ModelPreview';

export const Home: FC = () => {
  const mock_url = 'models/dog-preview.webp';
  const mock_glb = 'models/dog.glb';

  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);

  const data: ModelData[] = Array.from({ length: 20 }).map((_, i) => ({
    id: i.toString(),
    cover: mock_url,
    model: mock_glb,
  }));

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
