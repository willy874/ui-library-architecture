import { useState } from 'react';
import AskingQuestionImage from '@/assets/asking-question.png';
import { Button, Dialog } from '../imports';

export const Control = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        open={open}
        onOpenChange={({ open: value }) => {
          setOpen(value);
        }}
        titleNode="Dialog Title"
        descriptionNode="This is a description of the dialog."
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img width="160" height="160" src={AskingQuestionImage} alt="" />
        </div>
      </Dialog>
    </>
  );
};
