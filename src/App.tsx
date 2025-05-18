import { Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import { useUserRole } from './hooks/useUserRole';
import { UserRoleName } from './models/User';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import RegisterForm from './pages/RegisterForm';
import Submission from './pages/Submission';
import UserManage from './pages/UserManage';
import AuthLayout from './pages/layouts/AuthLayout';
import BaseLayout from './pages/layouts/BaseLayout';
import ProtectedRoute from './pages/layouts/ProtectedRoute';
import RoleProtectedRoute from './pages/layouts/RoleProtectedRoute';
import FacultyUsers from './pages/manager/FacultyUsers';
import CreateGroup from './pages/manager/Group/CreateGroup';
import Group from './pages/manager/Group/Group';
import Groups from './pages/manager/Group/Groups';
import UpdateGroup from './pages/manager/Group/UpdateGroup';
import ManagerHome from './pages/manager/ManagerHome';
import Reports from './pages/manager/Reports';
import Schedules from './pages/manager/Schedules';
import CreateSubject from './pages/manager/Subject/CreateSubject';
import Subjects from './pages/manager/Subject/Subjects';
import UpdateSubject from './pages/manager/Subject/UpdateSubject';
import AssignmentView from './pages/student/AssignmentView';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentAttendances from './pages/student/StudentAttendances';
import StudentGrades from './pages/student/StudentGrades';
import StudentGroup from './pages/student/StudentGroup';
import StudentHome from './pages/student/StudentHome';
import StudentSchedule from './pages/student/StudentSchedule';
import StudentSubjects from './pages/student/StudentSubjects';
import Home from './pages/superadmin/Home';
import Universities from './pages/superadmin/Universities';
import UniversityFaculties from './pages/superadmin/UniversityFaculties';
import Users from './pages/superadmin/Users';
import AssignmentEvaluation from './pages/teacher/AssignmentEvaluation';
import SubjectFinalGrades from './pages/teacher/SubjectFinalGrades';
import TeacherAssigments from './pages/teacher/TeacherAssigments';
import TeacherHome from './pages/teacher/TeacherHome';
import TeacherJournal from './pages/teacher/TeacherJournal';
import TeacherSchedule from './pages/teacher/TeacherSchedule';
import TeacherSubjects from './pages/teacher/TeacherSubjects';
import { routes } from './routes';

function App() {
  const { role } = useUserRole();

  const getHomeComponent = () => {
    switch (role) {
      case 'superadmin':
        return <Home />;
      case UserRoleName.MANAGER:
        return <ManagerHome />;
      case UserRoleName.TEACHER:
        return <TeacherHome />;
      case UserRoleName.STUDENT:
        return <StudentHome />;
      default:
        return <Profile />;
    }
  };

  const getUsersComponent = () => {
    switch (role) {
      case 'superadmin':
        return <Users />;
      case UserRoleName.MANAGER:
        return <FacultyUsers />;
      case UserRoleName.STUDENT:
        return <StudentGroup />;
      default:
        return <Profile />;
    }
  };

  return (
    <Box sx={{ height: '100%', position: 'relative', backgroundColor: 'secondary.main' }}>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <BaseLayout />
            </ProtectedRoute>
          }
        >
          <Route path={`${routes.PUBLIC.UNIVERSITY}/:id`} element={<UniversityFaculties />} />
          <Route path={routes.PUBLIC.UNIVERSITY} element={<Universities />} />
          <Route path={`${routes.PUBLIC.USERS}/:id`} element={<UserManage />} />
          <Route path={routes.PUBLIC.HOME} element={getHomeComponent()} />
          <Route path={routes.PUBLIC.USERS} element={getUsersComponent()} />
          <Route path={`${routes.PUBLIC.ASSIGNMENTS}/:id`} element={<Submission />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              {' '}
              <RoleProtectedRoute role="manager">
                {' '}
                <BaseLayout />{' '}
              </RoleProtectedRoute>{' '}
            </ProtectedRoute>
          }
        >
          <Route path={routes.PUBLIC.GROUP} element={<Groups />} />
          <Route path={routes.PUBLIC.SUBJECT} element={<Subjects />} />
          <Route path={routes.PUBLIC.CREATE_GROUP} element={<CreateGroup />} />
          <Route path={`${routes.PUBLIC.UPDATE_GROUP}/:id`} element={<UpdateGroup />} />
          <Route path={`${routes.PUBLIC.GROUP}/:id`} element={<Group />} />
          <Route path={routes.PUBLIC.CREATE_SUBJECT} element={<CreateSubject />} />
          <Route path={`${routes.PUBLIC.UPDATE_SUBJECT}/:id`} element={<UpdateSubject />} />
          <Route path={routes.PUBLIC.SCHEDULES} element={<Schedules />} />
          <Route path={routes.PUBLIC.REPORTS} element={<Reports />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              {' '}
              <RoleProtectedRoute role="teacher">
                {' '}
                <BaseLayout />{' '}
              </RoleProtectedRoute>{' '}
            </ProtectedRoute>
          }
        >
          <Route path={routes.PUBLIC.TEACHER_SCHEDULE} element={<TeacherSchedule />} />
          <Route path={routes.PUBLIC.TEACHER_SUBJECTS} element={<TeacherSubjects />} />
          <Route path={routes.PUBLIC.TEACHER_JOURNAL} element={<TeacherJournal />} />
          <Route path={routes.PUBLIC.TEACHER_ASSIGMENTS} element={<TeacherAssigments />} />
          <Route path={`${routes.PUBLIC.TEACHER_ASSIGMENTS}/:id`} element={<AssignmentEvaluation />} />
          <Route path={`${routes.PUBLIC.TEACHER_FINAL_GRADES}/:id`} element={<SubjectFinalGrades />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              {' '}
              <RoleProtectedRoute role="student">
                {' '}
                <BaseLayout />{' '}
              </RoleProtectedRoute>{' '}
            </ProtectedRoute>
          }
        >
          <Route path={routes.PUBLIC.STUDENT_SCHEDULE} element={<StudentSchedule />} />
          <Route path={routes.PUBLIC.STUDENT_SUBJECTS} element={<StudentSubjects />} />
          <Route path={routes.PUBLIC.STUDENT_GRADES} element={<StudentGrades />} />
          <Route path={routes.PUBLIC.STUDENT_ASSIGNMENTS} element={<StudentAssignments />} />
          <Route path={routes.PUBLIC.STUDENT_ATTENDANCES} element={<StudentAttendances />} />
          <Route path={`${routes.PUBLIC.STUDENT_ASSIGNMENTS}/:id`} element={<AssignmentView />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={routes.PUBLIC.AUTH} element={<Auth />} />
          <Route path={routes.PUBLIC.REGISTER} element={<RegisterForm />} />
        </Route>

        <Route element={<BaseLayout />}>
          <Route path={routes.PUBLIC.PROFILE} element={<Profile />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
