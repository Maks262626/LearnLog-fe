import { Assignment } from '@/models/Assignment';
import { Box } from '@mui/material';

import AssignmentCard from '../Cards/AssignmentCard';

interface IAssignmentCardList {
  assignments: Assignment[];
  handleClick: (id: string) => void;
  handleEdit?: (assignment: Assignment) => void;
  handleDelete?: (id: string) => void;
}

const AssignmentCardList = ({ assignments, handleClick, handleEdit, handleDelete }: IAssignmentCardList) => {
  return (
    <Box>
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          handleClick={() => handleClick(assignment.id)}
          onEdit={
            handleEdit
              ? () => {
                  handleEdit(assignment);
                }
              : undefined
          }
          onDelete={
            handleDelete
              ? () => {
                  handleDelete(assignment.id);
                }
              : undefined
          }
        />
      ))}
    </Box>
  );
};

export default AssignmentCardList;
