import { useState } from 'react';

import GridOnIcon from '@mui/icons-material/GridOn';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import AttendanceReport from '@/components/attendance/AttendanceGroupView';
import AttendancesView from '@/components/attendance/AttendancesView';
import GradesView from '@/components/journal/GradesView';

import {
  downloadGroupAttendanceIndividualPdf,
  downloadGroupAttendanceSummaryXlsx,
  downloadGroupGradeSummaryXlsx,
} from '@/utils/filesFetch';

import { useGetGroupsInMyFacultyQuery } from '@/redux/groupSlice';
import {
  useGetStudentAttendancesReportByUserIdQuery,
  useGetStudentGradesReportByUserIdQuery,
  useGetStudentGroupAttendanceSummaryQuery,
  useGetStudentGroupGradeSummaryQuery,
} from '@/redux/reportsApiSlice';
import { useGetUsersFromGroupQuery } from '@/redux/usersApiSlice';

import SubjectsGradesTableView from './SubjectGradeTableView';
import SubjectsGradesView from './SubjectGradesView';
import { useTranslation } from 'react-i18next';

const Reports = () => {
  const { t } = useTranslation();
  const { data: groups } = useGetGroupsInMyFacultyQuery();

  const [reportType, setReportType] = useState<'grades' | 'attendances' | 'individual'>('grades');
  const [viewType, setViewType] = useState<'view1' | 'view2'>('view1');
  const [groupId, setGroupId] = useState<string | undefined>(undefined);
  const { data } = useGetStudentGroupGradeSummaryQuery(groupId!, { skip: reportType !== 'grades' || !groupId });
  const { data: attendances } = useGetStudentGroupAttendanceSummaryQuery(groupId!, {
    skip: reportType !== 'attendances' || !groupId,
  });
  const { data: users } = useGetUsersFromGroupQuery(groupId!, { skip: !groupId });
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { data: studentIndividualAttendance } = useGetStudentAttendancesReportByUserIdQuery(userId!, {
    skip: !userId || reportType !== 'individual',
  });
  const { data: studentIndividualGrades } = useGetStudentGradesReportByUserIdQuery(userId!, {
    skip: !userId || reportType !== 'individual',
  });

  const handleSelectGroupChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setGroupId(value);
  };

  const handleSelectType = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setReportType(value as 'grades' | 'attendances' | 'individual');
  };

  const handleSelectView = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setViewType(value as 'view1' | 'view2');
  };

  const handleSelectUser = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setUserId(value);
  };

  const handleAttendanceXlsx = async () => {
    if (!groupId) return;
    await downloadGroupAttendanceSummaryXlsx(groupId);
  };

  const handleGroupAttendanceIndividualPdf = async () => {
    if (!groupId) return;
    await downloadGroupAttendanceIndividualPdf(groupId);
  };

  const handleGradeXlsx = async () => {
    if (!groupId) return;
    await downloadGroupGradeSummaryXlsx(groupId);
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <FormControl sx={{ minWidth: 200, mb: 3 }}>
            <InputLabel id="report-select-label">{t('reports.type')}</InputLabel>
            <Select labelId="report-select-label" value={reportType} label={t('reports.type')} onChange={handleSelectType}>
              <MenuItem value="grades">{t('reports.grades')}</MenuItem>
              <MenuItem value="attendances">{t('reports.attendances')}</MenuItem>
              <MenuItem value="individual">{t('reports.stats')}</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200, mb: 3 }}>
            <InputLabel id="group-label">{t('group.name')}</InputLabel>
            <Select label={t('group.name')} value={groupId ?? ''} onChange={handleSelectGroupChange}>
              {groups?.data.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {reportType === 'individual' && groupId && (
            <FormControl sx={{ minWidth: 200, mb: 3 }}>
              <InputLabel id="user-label">{t('user.user')}</InputLabel>
              <Select label={t('user.user')} value={userId ?? ''} onChange={handleSelectUser}>
                {users?.data.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {reportType === 'grades' && groupId && (
            <FormControl sx={{ minWidth: 200, mb: 3 }}>
              <InputLabel id="report-select-label">{t('reports.view')}</InputLabel>
              <Select
                labelId="report-select-view-label"
                value={viewType}
                label="Report Type"
                onChange={handleSelectView}
              >
                <MenuItem value="view1">{t('general.view')}1</MenuItem>
                <MenuItem value="view2">{t('general.view')}2</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>

        {reportType === 'attendances' && groupId && (
          <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<PictureAsPdfIcon />}
              onClick={handleGroupAttendanceIndividualPdf}
            >
              {t('reports.pdf')}
            </Button>
            <Button variant="outlined" color="success" startIcon={<GridOnIcon />} onClick={handleAttendanceXlsx}>
              {t('reports.xlsx')}
            </Button>
          </Box>
        )}

        {reportType === 'grades' && groupId && (
          <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
            <Button variant="outlined" color="success" startIcon={<GridOnIcon />} onClick={handleGradeXlsx}>
              {t('reports.xlsx')}
            </Button>
          </Box>
        )}

        {reportType === 'grades' && viewType === 'view1' && <SubjectsGradesView data={data?.data || []} />}
        {reportType === 'grades' && viewType === 'view2' && <SubjectsGradesTableView data={data?.data || []} />}
        {reportType === 'attendances' && <AttendanceReport data={attendances?.data || []} />}
        {reportType === 'individual' && userId && <GradesView data={studentIndividualGrades?.data || []} />}
        {reportType === 'individual' && userId && <AttendancesView data={studentIndividualAttendance?.data || []} />}
      </Box>
    </>
  );
};

export default Reports;
