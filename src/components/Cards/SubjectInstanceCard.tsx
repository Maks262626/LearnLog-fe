import { SubjectInstance, SubjectInstanceStatus } from '@/models/SubjectInstance';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoIcon from '@mui/icons-material/Info';
import LabelIcon from '@mui/icons-material/Label';
import SubjectIcon from '@mui/icons-material/MenuBook';
import PlaceIcon from '@mui/icons-material/Place';
import { Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ISubjectInstanceCard {
  subjectInstance: SubjectInstance | null;
}

const SubjectInstanceCard = ({ subjectInstance }: ISubjectInstanceCard) => {
  const {t} = useTranslation();

  if (!subjectInstance) {
    return <Typography>{t('subjectInstance.None')}</Typography>;
  }

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        p: 2,
        bgcolor: 'background.paper',
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Stack spacing={1} mb={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <SubjectIcon sx={{ color: 'white' }} fontSize="medium" />
            <Typography variant="h6" fontWeight={600}>
              {subjectInstance.name}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Chip label={subjectInstance.subject.name} size="small" color="primary" />
            <Chip label={subjectInstance.subject.group.name} size="small" variant="outlined" />
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1} mb={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CalendarTodayIcon sx={{ color: 'white' }} fontSize="medium" />
            <Typography variant="body2">{new Date(subjectInstance.date).toLocaleDateString()}</Typography>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <AccessTimeIcon sx={{ color: 'white' }} fontSize="medium" />
            <Typography variant="body2">
              {subjectInstance.start_time} – {subjectInstance.end_time}
            </Typography>
          </Stack>

          {subjectInstance.location && (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <PlaceIcon sx={{ color: 'white' }} fontSize="medium" />
              <Typography variant="body2">{subjectInstance.location}</Typography>
            </Stack>
          )}

          <Stack direction="row" spacing={1.5} alignItems="center">
            <InfoIcon sx={{ color: 'white' }} fontSize="medium" />
            <Typography variant="body2" textTransform="capitalize">
              {subjectInstance.type}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" spacing={1} alignItems="center">
          <LabelIcon sx={{ color: 'white' }} fontSize="medium" />
          <Typography variant="body2">{t('general.status')}:</Typography>
          <Chip
            label={subjectInstance.status}
            variant="outlined"
            color={
              subjectInstance.status === SubjectInstanceStatus.COMPLETED
                ? 'success'
                : subjectInstance.status === SubjectInstanceStatus.CANCELLED
                  ? 'error'
                  : 'warning'
            }
            size="small"
            sx={{ fontWeight: 600, textTransform: 'capitalize' }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SubjectInstanceCard;
