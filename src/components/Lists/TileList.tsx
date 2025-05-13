import { Container, Grid } from '@mui/material';

import Tile from '../Cards/Tile';

interface TileProps {
  title: string;
  description?: string;
  path: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

interface TileListProps {
  tileData: TileProps[];
}

const TileList = ({ tileData }: TileListProps) => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {tileData.map((tile) => (
          <Grid item key={tile.path} xs={12} sm={6} md={3}>
            <Tile {...tile} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TileList;
