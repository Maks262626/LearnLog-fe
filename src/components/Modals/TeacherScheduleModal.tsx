import { useState } from 'react';

import { SubjectInstance } from '@/models/SubjectInstance';
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import PreviewIcon from '@mui/icons-material/Visibility';
import { Box, IconButton, Modal, Tab, Tabs } from '@mui/material';

import AttendanceManage from '../Attendance';
import SubjectInstanceCard from '../Cards/SubjectInstanceCard';

interface ITeacherScheduleModal {
  open: boolean;
  onClose: () => void;
  subjectInstance: SubjectInstance | null;
}

const TeacherScheduleModal = ({ open, onClose, subjectInstance }: ITeacherScheduleModal) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const subjectInstanceMenu = (index: number) => {
    switch (index) {
      case 0:
        return <SubjectInstanceCard subjectInstance={subjectInstance} />;
      case 1:
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
          <Tab icon={<PreviewIcon />} aria-label="preview" />
          <Tab icon={<GroupIcon />} aria-label="attendance" />
        </Tabs>
        <Box mt={2}>{subjectInstanceMenu(tabIndex)}</Box>
      </Box>
    </Modal>
  );
};

export default TeacherScheduleModal;
