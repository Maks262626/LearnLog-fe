import { useNavigate } from 'react-router-dom';

import { Delete, Edit } from '@mui/icons-material';
import { Box, Card, CardActionArea, CardContent, IconButton, Typography } from '@mui/material';

interface TileProps {
  title: string;
  description?: string;
  path: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Tile = ({ title, description, path, onEdit, onDelete }: TileProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ borderRadius: 1, boxShadow: 3, position: 'relative', height: '100%' }}>
      <CardActionArea onClick={() => navigate(path)}>
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {(onEdit || onDelete) && (
        <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
          {onEdit && (
            <IconButton
              size="medium"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Edit fontSize="medium" sx={{ color: 'green' }} />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              size="medium"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Delete fontSize="medium" sx={{ color: 'red' }} />
            </IconButton>
          )}
        </Box>
      )}
    </Card>
  );
};

export default Tile;
