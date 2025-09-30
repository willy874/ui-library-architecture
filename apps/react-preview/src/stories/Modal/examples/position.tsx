import { Modal, AskingQuestionImage } from '../imports';

const Content = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
    <img width="160" height="160" src={AskingQuestionImage} alt="" />
  </div>
);

export const Position = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        padding: '20px',
      }}
    >
      <Modal position="top-left" titleNode="Top Left" triggerNode="Top Left">
        <Content />
      </Modal>
      <Modal position="top-center" titleNode="Top Center" triggerNode="Top Center">
        <Content />
      </Modal>
      <Modal position="top-right" titleNode="Top Right" triggerNode="Top Right">
        <Content />
      </Modal>
      <Modal position="left-center" titleNode="Left Center" triggerNode="Left Center">
        <Content />
      </Modal>
      <Modal position="center" titleNode="Center" triggerNode="Center">
        <Content />
      </Modal>
      <Modal position="right-center" titleNode="Right Center" triggerNode="Right Center">
        <Content />
      </Modal>
      <Modal position="bottom-left" titleNode="Bottom Left" triggerNode="Bottom Left">
        <Content />
      </Modal>
      <Modal position="bottom-center" titleNode="Bottom Center" triggerNode="Bottom Center">
        <Content />
      </Modal>
      <Modal position="bottom-right" titleNode="Bottom Right" triggerNode="Bottom Right">
        <Content />
      </Modal>
    </div>
  );
};
