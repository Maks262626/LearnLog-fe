import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Grade } from '@/models/Grade';
import { Box, Typography } from '@mui/material';

import GradeModal from '@/components/Modals/GradeModal';

import { GradeValidationType } from '@/utils/zod-validation';

import { useGetAssignmentByIdQuery } from '@/redux/assignmentsApiSlice';
import { useUpdateGradeMutation } from '@/redux/gradeApiSlice';

const CELL_SIZE = 60;

const AssignmentEvaluation = () => {
  const { id } = useParams();
  if (!id) return null;

  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState<Grade | null>(null);
  const { data: assignment, refetch } = useGetAssignmentByIdQuery(id);
  const [updateGrade] = useUpdateGradeMutation();

  const handleClick = (grade: Grade) => {
    setGrade(grade);
    setOpen(true);
  };

  const onSubmit = async (data: GradeValidationType) => {
    if (grade) {
      await updateGrade({ id: grade.id, body: data });
    }
    refetch();
    setOpen(false);
  };

  if (!assignment?.data) return null;

  return (
    <Box sx={{ overflowX: 'auto', borderRadius: 2, p: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `200px ${CELL_SIZE}px`,
          gap: 1,
          mb: 2,
          backgroundColor: '#282828',
          borderBottom: '2px solid #e2e8f0',
          py: 1,
        }}
      >
        <Typography sx={{ fontWeight: 600, px: 1 }}></Typography>
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          {assignment.data.name}
        </Typography>
      </Box>

      {assignment.data.grades.map((grade, index) => (
        <Box
          key={grade.id}
          sx={{
            display: 'grid',
            gridTemplateColumns: `200px ${CELL_SIZE}px`,
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
            {index + 1}. {grade.user.first_name} {grade.user.last_name}
          </Typography>

          <Box
            onClick={() => handleClick(grade)}
            sx={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              borderRadius: 2,
              backgroundColor: grade.grade_value ? '#f3f4f6' : '#fecaca',
              color: grade.grade_value ? 'black' : '#b91c1c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              '&:hover': {
                backgroundColor: '#eae712',
              },
            }}
          >
            {grade.grade_value ?? '–'}
          </Box>
        </Box>
      ))}

      <GradeModal open={open} onClose={() => setOpen(false)} onSubmit={onSubmit} grade={grade} />
    </Box>
  );
};

export default AssignmentEvaluation;
