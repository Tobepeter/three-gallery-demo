import { threeCanvas } from '@/three/three-canvas';

export type ModelPreviewProps = ModelData & {
  onClose?: () => void;
};

export const ModelPreview: FC<ModelPreviewProps> = (props) => {
  const canvasRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threeCanvas.setParent(canvasRootRef.current!);
    threeCanvas.loadModel(props.model);
  }, []);

  const desc = 'use w, e, r to switch transform mode';

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
          <div className="absolute top-2 left-2 text-white text-lg">{desc}</div>
        </div>
      </div>
    </Modal>
  );
};
