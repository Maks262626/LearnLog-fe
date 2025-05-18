import { useState } from 'react';

import { Assignment } from '@/models/Assignment';
import { Grade } from '@/models/Grade';
import { User } from '@/models/User';
import { Box, Typography } from '@mui/material';

import { GradeValidationType } from '@/utils/zod-validation';

import { useUpdateGradeMutation } from '@/redux/gradeApiSlice';

import GradeModal from '../Modals/GradeModal';

const CELL_SIZE = 60;

interface IAssignmentGradesView {
  users: User[];
  assignments: Assignment[];
}

const AssignmentGradesView = ({ users, assignments }: IAssignmentGradesView) => {
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [updateGrade] = useUpdateGradeMutation();

  const instanceCount = assignments.length ?? 0;

  const getGrade = (userId: string, assignment: Assignment) => {
    const grade = assignment.grades.find((g) => g.user_id === userId);
    if (grade) {
      return grade;
    }
  };

  const handleClick = (userId: string, assignment: Assignment) => {
    const grade = getGrade(userId, assignment);
    if (grade) {
      setGrade(grade);
      setOpen(true);
    }
  };
  const onSubmit = async (data: GradeValidationType) => {
    if (grade) {
      await updateGrade({ id: grade.id, body: data });
    }
    setOpen(false);
  };

  return (
    <Box sx={{ overflowX: 'auto', p: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `200px repeat(${instanceCount}, ${CELL_SIZE}px)`,
          gap: '4px',
          mb: 1,
          backgroundColor: '#282828',
          borderBottom: '2px solid #e2e8f0',
          py: 1,
        }}
      >
        <Typography sx={{ fontWeight: 600, px: 1 }}></Typography>
        {assignments.map((instance) => (
          <Box
            key={instance.id}
            sx={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              background: '#797479',
              borderRadius: '8px',
            }}
          >
            {instance.name.slice(0, 3)}
          </Box>
        ))}
      </Box>

      {users.map((user, index) => (
        <Box
          key={user.id}
          sx={{
            display: 'grid',
            gridTemplateColumns: `200px repeat(${instanceCount}, ${CELL_SIZE}px)`,
            gap: '4px',
            mb: 1,
            py: 1,
            borderBottom: '1px solid #e5e7eb',
            '&:hover': {
              backgroundColor: '#edff0045',
            },
          }}
        >
          <Box
            sx={{
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {index + 1}. {user.first_name}
          </Box>
          {assignments.map((instance) => (
            <Box
              onClick={() => handleClick(user.id, instance)}
              key={instance.id}
              sx={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                borderRadius: '8px',
                backgroundColor: getGrade(user.id, instance)?.grade_value ? '#f3f4f6' : '#fecaca',
                color: getGrade(user.id, instance)?.grade_value ? 'black' : '#b91c1c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s',
                '&:hover': {
                  backgroundColor: '#eae712',
                },
              }}
            >
              {getGrade(user.id, instance)?.grade_value ?? '-'}
            </Box>
          ))}
        </Box>
      ))}
      <GradeModal open={open} onClose={() => setOpen(false)} onSubmit={onSubmit} grade={grade} />
    </Box>
  );
};

export default AssignmentGradesView;
