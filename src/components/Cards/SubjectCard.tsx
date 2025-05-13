import { Subject } from '@/models/Subject';
import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Card, CardContent, IconButton, Typography } from '@mui/material';

interface SubjectCardProps {
  subject: Subject;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

const SubjectCard = ({ subject, onEdit, onDelete, onClick }: SubjectCardProps) => {
  return (
    <>
      <Card
        sx={{
          minWidth: 200,
          maxHeight: 250,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          border: '1px solid transparent',
          '&:hover': {
            border: `1px solid ${onClick ? '#FFFD02' : 'transparent'}`,
            cursor: 'pointer',
          },
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 1,
          }}
        >
          {onEdit && (
            <IconButton onClick={onEdit} color="primary" size="small">
              <Edit />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={onDelete} color="error" size="small">
              <Delete />
            </IconButton>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', minHeight: 50 }}>
            {subject.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {subject.description}
        </Typography> */}
        </CardContent>
        <Box
          sx={{
            p: 2,
            display: 'flex',
          }}
        >
          <Typography variant="h6">
            Teacher: {subject.teacher.first_name} {subject.teacher.last_name}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" size="small">
              {subject.group.name}
            </Button>
          </Box>
          <Typography
            variant="caption"
            sx={{
              fontSize: 12,
              fontWeight: 'bold',
              color: subject.type === 'exam' ? 'error.main' : 'primary.main',
            }}
          >
            {subject.type.toUpperCase()}
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default SubjectCard;
