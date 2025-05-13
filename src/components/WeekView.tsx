import { Day, SubjectInstance, SubjectInstanceStatus, daysOfWeek } from '@/models/SubjectInstance';
import { Color } from '@/types/Color';
import { Box, Grid, Paper, Typography } from '@mui/material';

interface IWeekView {
  lessons: Record<Day, SubjectInstance[]> | undefined;
  handleClick: (lecture: SubjectInstance) => void;
}

const WeekView = ({ lessons, handleClick }: IWeekView) => {
  const statusMap: Record<SubjectInstanceStatus, string> = {
    [SubjectInstanceStatus.PENDING]: '#cc8c14',
    [SubjectInstanceStatus.COMPLETED]: '#1bb334',
    [SubjectInstanceStatus.CANCELLED]: '#cc1d10',
  };

  const getStatusColor = (status: SubjectInstanceStatus): string => {
    const color = statusMap[status] || 'transparent';
    return color;
  };

  return (
    <Grid container spacing={2} px={2} py={3}>
      {daysOfWeek.map((day) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={1.71} key={day}>
          <Box
            sx={{
              borderRadius: 2,
              backgroundColor: 'background.paper',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'primary.main',
                borderBottom: `1px solid primary.main`,
                pb: 1,
              }}
            >
              {day}
            </Typography>

            {lessons?.[day].map((lecture) => (
              <Paper
                key={lecture.id}
                elevation={1}
                onClick={() => handleClick(lecture)}
                sx={{
                  p: 1,
                  borderRadius: 1,
                  textAlign: 'center',
                  backgroundColor: 'secondary.main',
                  color: 'primary.main',
                  fontWeight: 500,
                  fontSize: 14,
                  border: `1px solid ${getStatusColor(lecture.status)}`,
                  '&:hover': {
                    border: `1px solid #FFFD02`,
                    cursor: 'pointer',
                  },
                }}
              >
                {lecture.subject.name} {lecture.start_time.slice(0, 5)}-{lecture.end_time.slice(0, 5)}
              </Paper>
            ))}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeekView;
