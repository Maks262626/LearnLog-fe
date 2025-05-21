import { Assignment } from '@/models/Assignment';
import { Delete, Edit } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IAssignmentCard {
  assignment: Assignment;
  handleClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AssignmentCard = ({ assignment, handleClick, onEdit, onDelete }: IAssignmentCard) => {
  const {t} = useTranslation();
  
  return (
    <Card
      sx={{
        position: 'relative',
        minWidth: 275,
        borderRadius: 2,
        boxShadow: 3,
        mb: 2,
        border: '1px solid transparent',
        '&:hover': { border: '1px solid #FFFD02', cursor: 'pointer' },
      }}
      onClick={handleClick}
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
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            color="primary"
            size="small"
          >
            <Edit />
          </IconButton>
        )}
        {onDelete && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            color="error"
            size="small"
          >
            <Delete />
          </IconButton>
        )}
      </Box>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {assignment.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {t('general.due')}: {new Date(assignment.due_date).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
