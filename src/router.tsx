import {BrowserRouter, Route, Routes} from "react-router-dom"
import { AppLayout } from "./layouts/AppLayout"
import { DashboardView } from "./views/DashboardView"
import { CreateProjectView } from "./views/projects/CreateProjectView"
import { EditProjectView } from "./views/projects/EditProjectView"
import { ProjectDetailsView } from "./views/projects/ProjectDetailsView"
import { AuthLayout } from "./layouts/AuthLayout"
import LoginView from "./views/auth/LoginView"
import RegisterView from "./views/auth/RegisterView"
import { ConfitmAccountView } from "./views/auth/ConfitmAccountView"
import { RequestNewCodeView } from "./views/auth/RequestNewCodeView"
import { NewPasswordView } from "./views/auth/NewPasswordView"
import ForgotPasswordView from "./views/auth/ForgotPasswordView"
import { ProjectTeamView } from "./views/projects/ProjectTeamView"
import { ProfileViwe } from "./views/profile/ProfileViwe"
import { ProfileLayout } from "./layouts/ProfileLayout"
import ChangePasswordView from "./views/profile/ChangePasswordView"
import { NotFount } from "./views/404/NotFount"

export default function Router() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create/" element={<CreateProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsView/>} />
          <Route path="/projects/:projectId/edit/" element={<EditProjectView />} />
          <Route path="/projects/:projectId/team" element={<ProjectTeamView />} />
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileViwe />}/>
            <Route path="/profile/password" element={<ChangePasswordView />}/>
          </Route>
          
        </Route>
        {/* Login */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />}/>
          <Route path="/auth/register" element={<RegisterView />}/>
          <Route path="/auth/confirm-account" element={<ConfitmAccountView />}/>
          <Route path="/auth/request-code" element={<RequestNewCodeView />}/>
          <Route path="/auth/forgot-password" element={<ForgotPasswordView />}/>
          <Route path="/auth/new-password" element={<NewPasswordView />}/>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="*" element={<NotFount />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}