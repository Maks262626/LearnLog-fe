import { useState } from 'react';

import { SubjectInstance } from '@/models/SubjectInstance';
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import SubjectIcon from '@mui/icons-material/MenuBook';
import PreviewIcon from '@mui/icons-material/Visibility';
import { Box, IconButton, Modal, Tab, Tabs } from '@mui/material';

import { SubjectInstanceValidationType } from '@/utils/zod-validation';

import { useDeleteSubjectInstanceMutation } from '@/redux/subjectInstanceApiSlice';

import SubjectInstanceCard from '../Cards/SubjectInstanceCard';
import SubjectInstanceForm from '../Forms/SubjectInstanceForm';
import AttendanceManage from '../attendance/Attendance';

interface IScheduleModal {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SubjectInstanceValidationType) => void;
  subjectInstance: SubjectInstance | null;
  refetch: () => void;
}

const ScheduleModal = ({ open, onClose, onSubmit, subjectInstance, refetch }: IScheduleModal) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [deleteSubjectInstance] = useDeleteSubjectInstanceMutation();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleDelete = async () => {
    if (subjectInstance) {
      await deleteSubjectInstance(subjectInstance?.id);
      onClose();
      refetch();
    }
  };

  const subjectInstanceMenu = (index: number) => {
    switch (index) {
      case 0:
        return (
          <SubjectInstanceForm onSubmit={onSubmit} subjectInstance={subjectInstance} handleDelete={handleDelete} />
        );
      case 1:
        return <SubjectInstanceCard subjectInstance={subjectInstance} />;
      case 2:
        return <AttendanceManage subjectInstance={subjectInstance} />;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          px: 3,
          pt: 7,
          pb: 4,
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, color: 'primary.main' }}>
          <CloseIcon />
        </IconButton>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab icon={<SubjectIcon />} aria-label="form" />
          {subjectInstance && <Tab icon={<PreviewIcon />} aria-label="preview" />}
          {subjectInstance && <Tab icon={<GroupIcon />} aria-label="attendance" />}
        </Tabs>
        <Box mt={2}>{subjectInstanceMenu(tabIndex)}</Box>
      </Box>
    </Modal>
  );
};

export default ScheduleModal;
