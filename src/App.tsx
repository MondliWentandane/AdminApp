import { Route, Switch } from 'wouter';
import { AuthProvider } from './context/AuthContext';

// Pages
import Dashboard from './pages/Dashboard';
import GuestsList from './pages/guests/GuestsList';
import GuestDetails from './pages/guests/GuestDetails';
import AddGuest from './pages/guests/AddGuest';
import RoomsList from './pages/rooms/RoomsList';
import RoomDetails from './pages/rooms/RoomDetails';
import AddRoom from './pages/rooms/AddRoom';
import ReservationsList from './pages/reservations/ReservationsList';
import ReservationsCalendar from './pages/reservations/ReservationsCalendar';
import ReservationDetails from './pages/reservations/ReservationDetails';
import CreateReservation from './pages/reservations/CreateReservation';
import ProfileSettings from './pages/settings/ProfileSettings';
import NotificationSettings from './pages/settings/NotificationSettings';
import UserAccessManagement from './pages/settings/UserAccessManagement';
import SystemSettings from './pages/settings/SystemSettings';

export default function App() {
  return (
    <AuthProvider>
      <Switch>
        {/* Dashboard */}
        <Route path="/" component={Dashboard} />

        {/* Guests */}
        <Route path="/guests" component={GuestsList} />
        <Route path="/guests/add" component={AddGuest} />
        <Route path="/guests/:id" component={GuestDetails} />

        {/* Rooms */}
        <Route path="/rooms" component={RoomsList} />
        <Route path="/rooms/add" component={AddRoom} />
        <Route path="/rooms/:id" component={RoomDetails} />
        <Route path="/rooms/:id/edit" component={AddRoom} />

        {/* Reservations */}
        <Route path="/reservations" component={ReservationsList} />
        <Route path="/reservations/calendar" component={ReservationsCalendar} />
        <Route path="/reservations/create" component={CreateReservation} />
        <Route path="/reservations/:id" component={ReservationDetails} />

        {/* Settings */}
        <Route path="/settings" component={ProfileSettings} />
        <Route path="/settings/profile" component={ProfileSettings} />
        <Route path="/settings/notifications" component={NotificationSettings} />
        <Route path="/settings/users" component={UserAccessManagement} />
        <Route path="/settings/system" component={SystemSettings} />

        {/* 404 */}
        <Route>
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
              <h1 className="text-[#D4AF37] mb-4">404</h1>
              <p className="text-gray-600 mb-4">Page not found</p>
              <a href="/" className="text-[#D4AF37] hover:text-[#C4A030]">
                Go back to dashboard
              </a>
            </div>
          </div>
        </Route>
      </Switch>
    </AuthProvider>
  );
}