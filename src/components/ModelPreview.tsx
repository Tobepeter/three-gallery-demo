import { threeCanvas } from '@/three/three-canvas';

export type ModelPreviewProps = ModelData & {
  onClose?: () => void;
};

export const ModelPreview: FC<ModelPreviewProps> = (props) => {
  const canvasRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threeCanvas.setParent(canvasRootRef.current!);
  }, []);

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
        <div>Model</div>
        <div style={{ height: '85vh' }} className="overflow-hidden" ref={canvasRootRef}></div>
      </div>
    </Modal>
  );
};
