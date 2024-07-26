import { ModelItem } from '@/components/ModelItem';
import { ModelPreview } from '@/components/ModelPreview';
import { SkinDragger } from '@/components/SkinDragger';
import { FileAddOutlined, FileOutlined, InboxOutlined } from '@ant-design/icons';
import { CheckboxOptionType, Radio, UploadProps } from 'antd';

export const Home: FC = () => {
  // const mock_url = 'models/dog.webp';
  // const mock_glb = 'models/dog.glb';
  const mock_items = ['dog', 'girl', 'hamburger'];

  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);

  const data: ModelData[] = Array.from({ length: 20 }).map((_, i) => {
    const itemName = mock_items[i % mock_items.length];
    const cover = `models/${itemName}.webp`;
    const model = `models/${itemName}.glb`;

    return {
      id: i.toString(),
      cover,
      model,
    };
  });

  return (
    // <div className="p-3 bg-violet-300 min-h-lvh">
    <div className="p-3 bg-gradient-to-r from-violet-200 via-violet-300 to-violet-200 min-h-lvh">
      <div className="text-3xl text-violet-900">model gallery</div>
      {/* TODO: add flex wrap anim when have time */}
      <Flex wrap style={{ marginTop: 12 }} gap="small">
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
