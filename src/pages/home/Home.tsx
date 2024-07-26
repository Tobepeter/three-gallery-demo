import { ModelItem } from '@/components/ModelItem';
import { ModelPreview } from '@/components/ModelPreview';
import { SkinDragger } from '@/components/SkinDragger';
import { FileAddOutlined, FileOutlined, InboxOutlined } from '@ant-design/icons';
import { CheckboxOptionType, Radio, UploadProps } from 'antd';

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
    // <div className="p-3 bg-violet-300 min-h-lvh">
    <div className="p-3 bg-gradient-to-r from-violet-300 via-violet-400 to-violet-300 min-h-lvh">
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
