import { useState } from 'react';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

import AssignmentGradesView from '@/components/journal/AssignmentGradesView';
import JournalView from '@/components/journal/JournalView';

import { useGetAssignmentsBySubjectIdQuery } from '@/redux/assignmentsApiSlice';
import { useGetTeacherSubjectsQuery } from '@/redux/subjectApiSlice';
import { useGetSubjectInstancesBySubjectIdQuery } from '@/redux/subjectInstanceApiSlice';
import { useGetUsersFromGroupQuery } from '@/redux/usersApiSlice';
import { useTranslation } from 'react-i18next';

const TeacherJournal = () => {
  const { t } = useTranslation();
  const [groupId, setGroupId] = useState<string | null>(null);
  const [subjectId, setSubjectId] = useState<string | null>(null);

  const { data: subjects } = useGetTeacherSubjectsQuery();
  const { data: users } = useGetUsersFromGroupQuery(groupId!, { skip: !groupId });
  const { data: subjectInstances } = useGetSubjectInstancesBySubjectIdQuery(subjectId!, {
    skip: !subjectId,
  });
  const { data: assignments } = useGetAssignmentsBySubjectIdQuery(subjectId!, { skip: !subjectId });

  const handleSelectGroupChange = (e: SelectChangeEvent<string>) => {
    const subjectId = e.target.value;
    const subject = subjects?.data.find((s) => s.id === subjectId);
    setSubjectId(subjectId);
    if (subject) {
      setGroupId(subject.group.id);
    }
  };

  return (
    <>
      <FormControl sx={{ width: 300, mb: 4 }}>
        <InputLabel id="group-label">{t('teacher.subject')}</InputLabel>
        <Select label={t('group.name')} value={subjectId ?? ''} onChange={handleSelectGroupChange}>
          {subjects?.data.map((subject) => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.name} — {subject.group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {users && subjectInstances && <JournalView subjectInstances={subjectInstances.data} users={users.data} />}
      {users && assignments && <AssignmentGradesView users={users?.data} assignments={assignments?.data} />}

      {!users && !subjectInstances && (
        <Typography variant="body2" mt={2}>
          {t('teacher.selectSubject')}
        </Typography>
      )}
    </>
  );
};

export default TeacherJournal;
