import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { FinalGrade } from '@/models/FinalGrade';
import { Box } from '@mui/material';

import FinalGradeModal from '@/components/Modals/FinalGradeModal';

import { FinalGradeValidationType } from '@/utils/zod-validation';

import { useUpdateFinalGradeMutation } from '@/redux/finalGradeApiSlice';
import { useGetSubjectByIdQuery } from '@/redux/subjectApiSlice';

const CELL_SIZE = 60;

const SubjectFinalGrades = () => {
  const { id } = useParams();
  if (!id) return;
  const [open, setOpen] = useState(false);
  const { data: subject } = useGetSubjectByIdQuery(id);
  const [updateFinalGrade] = useUpdateFinalGradeMutation();
  const [finalGrade, setFinalGrade] = useState<FinalGrade | null>(null);

  const onSubmit = async (data: FinalGradeValidationType) => {
    if (finalGrade) {
      await updateFinalGrade({ id: finalGrade.id, body: data });
    }
    setOpen(false);
  };

  const handleClick = (finalGrade: FinalGrade) => {
    setFinalGrade(finalGrade);
    setOpen(true);
  };

  return (
    <Box sx={{ overflowX: 'auto', px: 4 }}>
      {subject?.data.finalGrades.map((grade, index) => (
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
          <Box
            sx={{
              px: 1,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {index + 1}. {grade.user.first_name} {grade.user.last_name}
          </Box>
          <Box
            onClick={() => handleClick(grade)}
            sx={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              borderRadius: '8px',
              backgroundColor: 'background.paper',
              boxShadow: 'inset 0 0 0 1px #c7d2fe',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s',
              '&:hover': {
                backgroundColor: '#eae712',
                color: 'black',
              },
            }}
          >
            {grade.final_grade} / {grade.exam_grade}
          </Box>
        </Box>
      ))}
      <FinalGradeModal open={open} onClose={() => setOpen(false)} onSubmit={onSubmit} finalGrade={finalGrade} />
    </Box>
  );
};

export default SubjectFinalGrades;
