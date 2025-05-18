import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { SvgIconProps } from '@mui/material';

export const routes = {
  PUBLIC: {
    HOME: '/',
    PROFILE: '/profile',
    AUTH: '/auth',
    UNIVERSITY: '/universities',
    USERS: '/users',
    REGISTER: '/register',
    GROUP: '/group',
    CREATE_GROUP: '/create_group',
    UPDATE_GROUP: '/update_group',
    SUBJECT: '/subject',
    CREATE_SUBJECT: '/create_subject',
    UPDATE_SUBJECT: '/update_subject',
    SCHEDULES: '/schedules',
    ASSIGNMENTS: '/assignments',
    STUDENT_SCHEDULE: '/student_schedule',
    STUDENT_SUBJECTS: '/student_subjects',
    STUDENT_GRADES: '/student_grades',
    STUDENT_ASSIGNMENTS: '/student_assigments',
    STUDENT_ATTENDANCES: '/student_attendances',
    TEACHER_SCHEDULE: '/teacher_schedule',
    TEACHER_SUBJECTS: '/teacher_subjects',
    TEACHER_JOURNAL: '/teacher_journal',
    TEACHER_ASSIGMENTS: '/teacher_assigments',
    TEACHER_FINAL_GRADES: '/teacher_final_grades',
    REPORTS: '/reports',
  },
  API: {
    BASE: import.meta.env.VITE_API_BASE,
  },
};

interface SidebarLink {
  icon: React.ElementType<SvgIconProps>;
  route: string;
  label: string;
}

export const sidebarLinks: SidebarLink[] = [
  {
    icon: HomeIcon,
    label: 'Home',
    route: routes.PUBLIC.HOME,
  },
  {
    icon: PersonOutlineIcon,
    label: 'Profile',
    route: routes.PUBLIC.PROFILE,
  },
  {
    icon: PeopleOutlineIcon,
    label: 'Users',
    route: routes.PUBLIC.USERS,
  },
];
