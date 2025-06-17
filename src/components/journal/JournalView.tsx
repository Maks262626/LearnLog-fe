import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AttendanceStatus } from '@/models/Attendance';
import { SubjectInstance } from '@/models/SubjectInstance';
import { User } from '@/models/User';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

import TeacherScheduleModal from '../Modals/TeacherScheduleModal';

const CELL_SIZE = 60;

interface IJournalView {
  subjectInstances: SubjectInstance[];
  users: User[];
}

const JournalView = ({ subjectInstances, users }: IJournalView) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [subjectInstance, setSubjectInstance] = useState<SubjectInstance | null>(null);
  const instanceCount = subjectInstances.length ?? 0;

  const handleClick = (subjectInstance: SubjectInstance) => {
    setSubjectInstance(subjectInstance);
    setOpen(true);
  };

  const getAttendance = (userId: string, subjectInstance: SubjectInstance): AttendanceStatus | undefined => {
    return subjectInstance.attendances.find((a) => a.user.id === userId)?.status;
  };

  return (
    <Box sx={{ overflowX: 'auto', borderRadius: 2, p: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `200px repeat(${instanceCount}, ${CELL_SIZE}px)`,
          gap: 1,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: '#282828',
          borderBottom: '2px solid #e2e8f0',
          py: 1,
        }}
      >
        <Typography sx={{ fontWeight: 600, px: 1 }}></Typography>
        {subjectInstances.map((instance) => (
          <Box
            key={instance.id}
            sx={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              backgroundColor: '#797479',
              borderRadius: 2,
            }}
          >
            {dayjs(instance.date).format('DD.MM')}
          </Box>
        ))}
      </Box>

      {users.map((user, index) => (
        <Box
          key={user.id}
          sx={{
            display: 'grid',
            gridTemplateColumns: `200px repeat(${instanceCount}, ${CELL_SIZE}px)`,
            gap: 1,
            alignItems: 'center',
            py: 1,
            borderBottom: '1px solid #e5e7eb',
            '&:hover': {
              backgroundColor: '#edff0045',
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              px: 1,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {index + 1}. {user.first_name}
          </Typography>

          {subjectInstances.map((instance) => {
            const status = getAttendance(user.id, instance);
            const isAbsent = status === AttendanceStatus.ABSENT;

            return (
              <Box
                key={`${user.id}-${instance.id}`}
                onClick={() => handleClick(instance)}
                sx={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  borderRadius: 2,
                  backgroundColor: isAbsent ? '#fecaca' : '#f3f4f6',
                  color: isAbsent ? '#b91c1c' : 'black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#eae712',
                  },
                }}
              >
                {isAbsent ? t('attendance.absentShort') : ''}
              </Box>
            );
          })}
        </Box>
      ))}

      <TeacherScheduleModal open={open} onClose={() => setOpen(false)} subjectInstance={subjectInstance} />
    </Box>
  );
};

export default JournalView;
``;
