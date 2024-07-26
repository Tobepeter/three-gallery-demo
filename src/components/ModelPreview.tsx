import { threeCanvas } from '@/three/three-canvas';
import { CheckboxOptionType, Radio, RadioChangeEvent } from 'antd';

export type ModelPreviewProps = ModelData & {
  onClose?: () => void;
};

export const ModelPreview: FC<ModelPreviewProps> = (props) => {
  const canvasRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threeCanvas.setParent(canvasRootRef.current!);
    threeCanvas.resetCamera();
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
        <div className="text-xl">Model Viewer</div>
        <div style={{ height: '85vh' }} className="overflow-hidden relative mt-2" ref={canvasRootRef}>
          {/* <div className="absolute top-2 left-2 text-white text-lg">{desc}</div> */}
          <div className="absolute top-4 left-4">
            <Radio.Group options={options} defaultValue={'translate'} optionType="button" onChange={onModeChange} />;
          </div>
        </div>
      </div>
    </Modal>
  );
};
