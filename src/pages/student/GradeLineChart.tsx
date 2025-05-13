import { Box, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

interface GradeEntry {
  name: string;
  grade: number;
}

interface Props {
  grades: GradeEntry[];
}

const GradeLineChart = ({ grades }: Props) => {
  if (grades.length === 0) return null;

  const xLabels = grades.map((g) => g.name);
  const yValues = grades.map((g) => g.grade);

  return (
    <Box mt={3}>
      <Typography variant="subtitle2" gutterBottom>
        Grade Progression
      </Typography>
      <LineChart
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        series={[{ data: yValues, label: 'Grade' }]}
        width={500}
        height={250}
      />
    </Box>
  );
};

export default GradeLineChart;
