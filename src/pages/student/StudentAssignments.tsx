import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { routes } from '@/routes';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

import AssignmentCardList from '@/components/Lists/AssignmentCardList';
import StudentSubmissionList from '@/components/Lists/StudentSubmissionList';

import { useGetAssignmentsBySubjectIdQuery } from '@/redux/assignmentsApiSlice';
import { useGetStudentSubmissionBySubjectIdQuery } from '@/redux/studentSubmissionApiSlice';
import { useGetSubjectsInMyGroupQuery } from '@/redux/subjectApiSlice';
import { useTranslation } from 'react-i18next';

const StudentAssignments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslation();
  const state = location.state as { subjectId?: string };
  const [subjectId, setSubjectId] = useState<string | null>(state.subjectId ?? null);
  const { data: subjects } = useGetSubjectsInMyGroupQuery();
  const { data: assigments } = useGetAssignmentsBySubjectIdQuery(subjectId!, { skip: !subjectId });
  const { data: submissions } = useGetStudentSubmissionBySubjectIdQuery(subjectId!, { skip: !subjectId });

  const handleSelectGroupChange = (e: SelectChangeEvent<string>) => {
    const subjectId = e.target.value;
    setSubjectId(subjectId);
  };

  const handleClick = (assignmentId: string) => {
    navigate(`${routes.PUBLIC.STUDENT_ASSIGNMENTS}/${assignmentId}`);
  };

  return (
    <Box sx={{ px: 2 }}>
      <Box sx={{ display: 'inline-flex', gap: 3, flexDirection: 'column', mb: 5 }}>
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="group-label">{t('student.subject')}</InputLabel>
          <Select label="Group" value={subjectId ?? ''} onChange={handleSelectGroupChange}>
            {subjects?.data.map((subject) => (
              <MenuItem key={subject.id} value={subject.id}>
                {subject.name} — {subject.group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {assigments && <AssignmentCardList assignments={assigments.data} handleClick={handleClick} />}
      {assigments && assigments.data.length === 0 && <Typography>{t('assignment.noAssignment')}</Typography>}
      {submissions && <StudentSubmissionList submissions={submissions.data} />}
    </Box>
  );
};

export default StudentAssignments;
