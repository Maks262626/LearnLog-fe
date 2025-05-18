import { routes } from '@/routes';

const downloadResponceAsFile = async (res: Response, link: string) => {
  try {
    const blob = await res.blob();
    const URL = window.URL || window.webkitURL;
    const downloadURL = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadURL;
    a.target = '_blank';
    a.download = link;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadURL);
    }, 1000);
  } catch (err) {
    console.error('Failed to download File:', err);
  }
};

const fetchGroupAttendanceSummaryXlsx = async (groupId: string) => {
  try {
    const token = localStorage.getItem('token');
    const api_url = `${routes.API.BASE}${routes.API.REPORTS}/student-group-attendance-summary/xlsx/${groupId}`;
    const res = await fetch(api_url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.error('Failed to fetch:', err);
  }
};

const fetchGroupAttendanceIndividualPdf = async (groupId: string) => {
  try {
    const token = localStorage.getItem('token');
    const api_url = `${routes.API.BASE}${routes.API.REPORTS}/student-group-attendance-individual/pdf/${groupId}`;
    const res = await fetch(api_url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.error('Failed to fetch:', err);
  }
};

const fetchGroupGradeSummaryXlsx = async (groupId: string) => {
  try {
    const token = localStorage.getItem('token');
    const api_url = `${routes.API.BASE}${routes.API.REPORTS}/student-group-grade-summary/xlsx/${groupId}`;
    const res = await fetch(api_url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.error('Failed to fetch:', err);
  }
};

export const downloadGroupAttendanceSummaryXlsx = async (groupId: string) => {
  const res = await fetchGroupAttendanceSummaryXlsx(groupId);
  if (!res) return;
  const link = 'group-report.xlsx';
  await downloadResponceAsFile(res, link);
};

export const downloadGroupAttendanceIndividualPdf = async (groupId: string) => {
  const res = await fetchGroupAttendanceIndividualPdf(groupId);
  if (!res) return;
  const link = 'group-report.pdf';
  await downloadResponceAsFile(res, link);
};

export const downloadGroupGradeSummaryXlsx = async (groupId: string) => {
  const res = await fetchGroupGradeSummaryXlsx(groupId);
  if (!res) return;
  const link = 'group-report.xlsx';
  await downloadResponceAsFile(res, link);
};
