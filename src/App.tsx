import "./index.css";
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import WelcomePage from "./app/page";
import SignupPage from "./app/auth/signup/page";
import LoginPage from "./app/auth/login/page";
import VerifyCodePage from "./app/auth/verify-code/page";
import ForgotPasswordPage from "./app/auth/forgot-password/page";
import Dashboard from "./app/dashboard/page";
import OnboardingPage from "./app/onboarding/page";
import EditProfilePage from "./app/profile/edit/page";
import SettingsPage from "./app/settings/page";
import GoalsPage from "./app/goals/page";
import BookingPage from "./app/booking/page";
import SessionsPage from "./app/sessions/page";
import TherapistMessagePage from "./app/therapist/[id]/message/page";
import CommunityPage from "./app/community/page";
import ResourcesPage from "./app/resources/page";
import ResourceDetailPage from "./app/resources/[id]/page";
import AiCompanionPage from "./app/ai-companion/page";
import MoodTrackerPage from "./app/mood-tracker/page";
import SleepTrackerPage from "./app/sleep-tracker/page";
import FindTherapistPage from "./app/find-therapist/page";
import TherapistProfilePage from "./app/therapist/[id]/page";
import CopingKitPage from "./app/coping-kit/page";
import CrisisSupportPage from "./app/crisis-support/page";
import GamesHubPage from "./app/games/page";
import EmotionPuzzlePage from "./app/games/emotion-puzzle/page";
import MindfulGardenPage from "./app/games/mindful-garden/page";
import StoryWeaverPage from "./app/games/story-weaver/page";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/auth/signup" component={SignupPage} />
        <Route exact path="/auth/verify-code" component={VerifyCodePage} />
        <Route exact path="/auth/forgot-password" component={ForgotPasswordPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/onboarding" component={OnboardingPage} />
        <Route exact path="/profile/edit" component={EditProfilePage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route exact path="/ai-companion" component={AiCompanionPage} />
        <Route exact path="/mood-tracker" component={MoodTrackerPage} />
        <Route exact path="/sleep-tracker" component={SleepTrackerPage} />
        <Route exact path="/goals" component={GoalsPage} />
        <Route exact path="/booking" component={BookingPage} />
        <Route exact path="/sessions" component={SessionsPage} />
        <Route exact path="/find-therapist" component={FindTherapistPage} />
        <Route exact path="/therapist/:id" component={TherapistProfilePage} />
        <Route exact path="/therapist/:id/message" component={TherapistMessagePage} />
        <Route exact path="/community" component={CommunityPage} />
        <Route exact path="/resources" component={ResourcesPage} />
        <Route exact path="/resources/:id" component={ResourceDetailPage} />
        <Route exact path="/coping-kit" component={CopingKitPage} />
        <Route exact path="/crisis-support" component={CrisisSupportPage} />
        <Route exact path="/games" component={GamesHubPage} />
        <Route exact path="/games/emotion-puzzle" component={EmotionPuzzlePage} />
        <Route exact path="/games/mindful-garden" component={MindfulGardenPage} />
        <Route exact path="/games/story-weaver" component={StoryWeaverPage} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
