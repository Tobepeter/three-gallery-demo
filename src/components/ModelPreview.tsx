import { threeCanvas } from '@/three/three-canvas';
import { CheckboxOptionType, Radio, RadioChangeEvent, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { SkinDragger } from './SkinDragger';
import { threeUtil } from '@/utils/three-util';

export type ModelPreviewProps = ModelData & {
  onClose?: () => void;
};

export const ModelPreview: FC<ModelPreviewProps> = (props) => {
  const canvasRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threeCanvas.setParent(canvasRootRef.current!);
    threeCanvas.loadModel(props.model);
  }, []);

  const options: CheckboxOptionType<TransformMode>[] = [
    { label: 'translate', value: 'translate' },
    { label: 'rotate', value: 'rotate' },
    { label: 'scale', value: 'scale' },
  ];

  const onModeChange = (event: RadioChangeEvent) => {
    threeCanvas.changeTfMode(event.target.value as TransformMode);
  };

  const actions: Record<string, AnyFunction> = {
    export: () => {
      threeCanvas.export();
    },
    reset: () => {
      threeCanvas.reset();
    },
    mirrorX: () => {
      threeCanvas.mirrorX();
    },
    mirrorY: () => {
      threeCanvas.mirrorY();
    },
    getSkin: () => {
      threeCanvas.downloadTexture();
    },
  };

  return (
    <Modal
      open
      footer={false}
      // TODO: close anim not work
      onCancel={() => {
        props.onClose?.();
      }}
      centered
      width="90vw"
      style={{ minWidth: 800 }}
    >
      <div>
        <div className="text-xl text-violet-900">Model Viewer</div>
        <div style={{ height: '85vh' }} className="overflow-hidden relative mt-2" ref={canvasRootRef}>
          {/* <div className="absolute top-2 left-2 text-white text-lg">{desc}</div> */}

          {/* transform mode controls */}
          <div className="absolute top-4 left-4">
            <Radio.Group options={options} defaultValue={'translate'} optionType="button" onChange={onModeChange} />
          </div>

          {/* actions */}
          <div className="absolute top-4 right-4">
            <Space direction="vertical" align="end">
              {Object.entries(actions).map(([key, action]) => (
                <Button key={key} onClick={action}>
                  {key}
                </Button>
              ))}
            </Space>
          </div>

          {/* desc */}
          <div className="absolute bottom-4 left-4">
            <div className="text-violet-900 text-lg">drag to rotate</div>
          </div>

          {/* upload */}
          <div className="absolute bottom-4 right-4">
            <Space direction="vertical" align="end">
              <Button
                onClick={() => {
                  threeUtil.downloadCanvas(threeUtil.getChessboardCanvas(), 'chessboard.png');
                }}
              >
                demo skin
              </Button>
              <SkinDragger
                onUpload={(file) => {
                  const isGlb = file.name.endsWith('.glb');
                  if (isGlb) {
                    const url = URL.createObjectURL(file);
                    threeCanvas.loadModel(url).then(() => {
                      URL.revokeObjectURL(url);
                    });
                    return;
                  }

                  // threeCanvas.loadTexture(file);
                  threeUtil.file2Texture(file).then((texture) => {
                    threeCanvas.changeSkin(texture);
                  });
                }}
              />
            </Space>
          </div>
        </div>
      </div>
    </Modal>
  );
};
