import { FileAddOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd';

export type SkinDraggerProps = {
  onUpload?: (file: File) => void;
};

export const SkinDragger: FC<SkinDraggerProps> = (props) => {
  const { Dragger } = Upload;

  return (
    <Dragger
      style={{ width: 180, backgroundColor: 'white', opacity: 0.8 }}
      // name="file"
      accept=".png,.jpg,.jpeg,.webp,.glb"
      customRequest={(options) => {
        props.onUpload?.(options.file as File);
      }}
      itemRender={(originNode, file, currFileList) => {
        return null;
      }}
      // onDrop={(e) => {
      //   console.log('Dropped files', e.dataTransfer.files);
      // }}
    >
      <p className="ant-upload-drag-icon">
        <FileAddOutlined />
      </p>
      <p>change skin or glb</p>
      {/* TODO: maybe can add a iamge display to show it */}
    </Dragger>
  );
};
