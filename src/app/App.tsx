import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthCard } from 'features/auth';
import {
  AuthConfirmFlow,
  AuthConfirmRequest,
  AuthConfirmVerifyView,
} from 'features/auth/auth-confirm';
import {
  AuthResetFlow,
  AuthResetRequest,
  AuthResetVerifyView,
  AuthResetSentEmail,
} from 'features/auth/auth-reset';
import { Loader } from 'shared/ui';

import { useInitializeApp } from './init/initializeApp';
import { PrivateRoute } from './providers/router/PrivateRoute';
import { PublicRoute } from './providers/router/PublicRoute';
import { useAppSelector } from './providers/store/hooks/useAppDispatch';

import { TestPage } from 'pages/testPage';


const AuthPage = lazy(() => import('pages/AuthPage/AuthPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage/ProfilePage'));
const ProjectPage = lazy(() => import('pages/ProjectPage/ProjectPage'));

export function App() {
  const { isInitialized } = useAppSelector(state => state.auth)

  useInitializeApp();

  if (!isInitialized) return <Loader />

  return (
    // <BrowserRouter basename="/todolist">
    <BrowserRouter>
      <Suspense>
        <Routes>


          {/* роут для верстки компонентов */}
          <Route path="/profile" element={<ProfilePage />} />


          <Route element={<PublicRoute />}>
            {/* Тестовая страница */}
            <Route index element={<TestPage />} />

            <Route path="/auth" element={<AuthPage />}>
              <Route index element={<AuthCard />} />
               <Route path="gitlab/callback" element={<AuthCard />} /> 
               <Route path="google/callback" element={<AuthCard />} />

              <Route path="confirm" element={<AuthConfirmFlow />}>
                <Route index element={<AuthConfirmRequest />} />
                <Route path="verify" element={<AuthConfirmVerifyView />} />
              </Route>

              <Route path="reset" element={<AuthResetFlow />}>
                <Route index element={<AuthResetRequest />} />
                <Route path="verify" element={<AuthResetVerifyView />} />
                <Route path="sent" element={<AuthResetSentEmail />} />
              </Route>
            </Route>
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/project" element={<ProjectPage />} />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
