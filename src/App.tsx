import './App.css';
import Sidebar from './components/sidebar';
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from './pages/home';
import TopMenu from './components/topMenu';
import Tickets from './pages/tickets/Tickets';
import CheckTickets from './pages/CheckTickets';
import TicketPackages from './pages/ticketPackages';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main">
          <TopMenu />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tickets' element={<Tickets />} />
            <Route path='/check' element={<CheckTickets />} />
            <Route path='/settings' element={<TicketPackages />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
