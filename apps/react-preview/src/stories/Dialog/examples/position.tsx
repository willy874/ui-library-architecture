import { Dialog, AskingQuestionImage } from '../imports';

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
      <Dialog position="top-left" titleNode="Top Left" triggerNode="Top Left">
        <Content />
      </Dialog>
      <Dialog position="top" titleNode="Top" triggerNode="Top">
        <Content />
      </Dialog>
      <Dialog position="top-right" titleNode="Top Right" triggerNode="Top Right">
        <Content />
      </Dialog>
      <Dialog position="left-center" titleNode="Left Center" triggerNode="Left Center">
        <Content />
      </Dialog>
      <Dialog position="center" titleNode="Center" triggerNode="Center">
        <Content />
      </Dialog>
      <Dialog position="right-center" titleNode="Right Center" triggerNode="Right Center">
        <Content />
      </Dialog>
      <Dialog position="bottom-left" titleNode="Bottom Left" triggerNode="Bottom Left">
        <Content />
      </Dialog>
      <Dialog position="bottom" titleNode="Bottom" triggerNode="Bottom">
        <Content />
      </Dialog>
      <Dialog position="bottom-right" titleNode="Bottom Right" triggerNode="Bottom Right">
        <Content />
      </Dialog>
    </div>
  );
};
