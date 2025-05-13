import { Subject } from '@/models/Subject';
import { Grid, Typography } from '@mui/material';

import SubjectCard from '../Cards/SubjectCard';

interface SubjectListProps {
  subjects: Subject[];
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
  handleClick?: (id: string) => void;
}

const SubjectList = ({ subjects, handleEdit, handleDelete, handleClick }: SubjectListProps) => {
  if (subjects.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center">
        No subjects available
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} sx={{ px: 2 }}>
      {subjects.map((subject) => (
        <Grid item xs={12} sm={6} md={4} key={subject.id}>
          <SubjectCard
            subject={subject}
            onClick={
              handleClick
                ? () => {
                    handleClick(subject.id);
                  }
                : undefined
            }
            onDelete={handleDelete ? () => {} : undefined}
            onEdit={
              handleEdit
                ? () => {
                    handleEdit(subject.id);
                  }
                : undefined
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SubjectList;
