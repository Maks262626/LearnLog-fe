import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

import AssignmentCardList from '@/components/Lists/AssignmentCardList';
import StudentSubmissionList from '@/components/Lists/StudentSubmissionList';
import StudentSubmissionModal from '@/components/Modals/StudentSubmissionModal';

import { StudentSubmissionValidationType } from '@/utils/zod-validation';

import { useGetAssignmentsBySubjectIdQuery } from '@/redux/assignmentsApiSlice';
import {
  useCreateStudentSubmissionMutation,
  useGetStudentSubmissionBySubjectIdQuery,
} from '@/redux/studentSubmissionApiSlice';
import { useGetSubjectsInMyGroupQuery } from '@/redux/subjectApiSlice';

const StudentAssignments = () => {
  const location = useLocation();
  const state = location.state as { subjectId?: string };
  const [subjectId, setSubjectId] = useState<string | null>(state.subjectId ?? null);
  const [assignmentId, setAssignmentId] = useState<string | null>(null);
  const { data: subjects } = useGetSubjectsInMyGroupQuery();
  const { data: assigments } = useGetAssignmentsBySubjectIdQuery(subjectId!, { skip: !subjectId });
  const { data: submissions, refetch } = useGetStudentSubmissionBySubjectIdQuery(subjectId!, { skip: !subjectId });
  const [open, setOpen] = useState(false);
  const [createStudentSubmission] = useCreateStudentSubmissionMutation();

  const handleSelectGroupChange = (e: SelectChangeEvent<string>) => {
    const subjectId = e.target.value;
    setSubjectId(subjectId);
  };

  const handleClick = (assignmentId: string) => {
    setAssignmentId(assignmentId);
    setOpen(true);
  };

  const onSubmit = async (data: StudentSubmissionValidationType) => {
    await createStudentSubmission(data);
    setOpen(false);
    refetch();
  };

  return (
    <Box sx={{ px: 2 }}>
      <Box sx={{ display: 'inline-flex', gap: 3, flexDirection: 'column', mb: 5 }}>
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="group-label">Subjects</InputLabel>
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
      {assigments && assigments.data.length === 0 && <Typography>No Assignments yet</Typography>}
      {submissions && <StudentSubmissionList submissions={submissions.data} />}
      <StudentSubmissionModal
        onSubmit={onSubmit}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        assignmentId={assignmentId}
      />
    </Box>
  );
};

export default StudentAssignments;
