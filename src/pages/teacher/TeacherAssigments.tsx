import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Assignment } from '@/models/Assignment';
import { routes } from '@/routes';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

import AssignmentCardList from '@/components/Lists/AssignmentCardList';
import StudentSubmissionList from '@/components/Lists/StudentSubmissionList';
import AssignmentModal from '@/components/Modals/AssignmentModal';
import Loader from '@/components/common/Loader';

import { AssigmentValidationType } from '@/utils/zod-validation';

import {
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAssignmentsBySubjectIdQuery,
  useUpdateAssignmentMutation,
} from '@/redux/assignmentsApiSlice';
import { useGetStudentSubmissionBySubjectIdQuery } from '@/redux/studentSubmissionApiSlice';
import { useGetTeacherSubjectsQuery } from '@/redux/subjectApiSlice';

const TeacherAssigments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { subjectId?: string };

  const [open, setOpen] = useState(false);
  const [subjectId, setSubjectId] = useState<string | null>(state.subjectId ?? null);
  const [assigment, setAssignment] = useState<Assignment | null>(null);
  const { data: subjects, isLoading } = useGetTeacherSubjectsQuery();
  const { data: assigments } = useGetAssignmentsBySubjectIdQuery(subjectId!, { skip: !subjectId });
  const { data: submissions } = useGetStudentSubmissionBySubjectIdQuery(subjectId!, { skip: !subjectId });
  const [createAssignment] = useCreateAssignmentMutation();
  const [updateAssignment] = useUpdateAssignmentMutation();
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const onSubmit = async (data: AssigmentValidationType) => {
    if (assigment) {
      await updateAssignment({ id: assigment.id, body: data });
    } else {
      await createAssignment({ ...data, due_date: new Date(data.due_date) });
    }
    setAssignment(null);
    setOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteAssignment(id);
  };

  const handleEdit = (assigment: Assignment) => {
    setAssignment(assigment);
    setOpen(true);
  };

  const handleClick = (id: string) => {
    navigate(`${routes.PUBLIC.TEACHER_ASSIGMENTS}/${id}`);
  };

  const handleSelectGroupChange = (e: SelectChangeEvent<string>) => {
    const subjectId = e.target.value;
    setSubjectId(subjectId);
  };

  const handleAddAssignment = () => {
    setAssignment(null);
    setOpen(true);
  };

  const handleFinalGrade = () => {
    if (subjectId) {
      navigate(`${routes.PUBLIC.TEACHER_FINAL_GRADES}/${subjectId}`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

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
        {subjectId && (
          <Button variant="contained" color="primary" onClick={handleAddAssignment}>
            Create Assignment
          </Button>
        )}
        {subjectId && (
          <Button variant="contained" color="primary" onClick={handleFinalGrade}>
            set final grade
          </Button>
        )}
      </Box>
      {assigments && (
        <AssignmentCardList
          assignments={assigments.data}
          handleClick={handleClick}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
      {assigments && assigments.data.length === 0 && <Typography>No Assignments yet</Typography>}
      {submissions && <StudentSubmissionList submissions={submissions.data} />}
      <AssignmentModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        subjectId={subjectId}
        assignment={assigment}
      />
    </Box>
  );
};

export default TeacherAssigments;
