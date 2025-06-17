import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Box, Button } from '@mui/material';
import MarkdownPreview from '@uiw/react-markdown-preview';

import StudentSubmissionModal from '@/components/Modals/StudentSubmissionModal';

import { StudentSubmissionValidationType } from '@/utils/zod-validation';

import { useGetAssignmentByIdQuery } from '@/redux/assignmentsApiSlice';
import { useCreateStudentSubmissionMutation } from '@/redux/studentSubmissionApiSlice';

const AssignmentView = () => {
  const { id } = useParams();
  if (!id) return;
  const { t } = useTranslation();
  const { data: assignment } = useGetAssignmentByIdQuery(id);
  const [open, setOpen] = useState(false);
  const [createStudentSubmission] = useCreateStudentSubmissionMutation();

  const onSubmit = async (data: StudentSubmissionValidationType) => {
    await createStudentSubmission(data);
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ px: 4 }}>
      <MarkdownPreview source={assignment?.data.description} style={{ padding: '24px' }} />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleClick}>
        {t('submission.send')}
      </Button>
      <StudentSubmissionModal
        onSubmit={onSubmit}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        assignmentId={id}
      />
    </Box>
  );
};

export default AssignmentView;
