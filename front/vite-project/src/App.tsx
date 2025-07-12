import { Routes, Route } from 'react-router-dom';
import { TicketProvider } from './contexts/TicketContext';
import Header from './components/Header';
import PrizePoolPage from './components/PrizePoolPage';
import TicketPage from './components/TicketPage';
import TradeDEX from './components/TradeDEX';
import EmptyPage from './components/EmptyPage';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import DrawPage from './components/DrawPage';

function App() {
  return (
    <TicketProvider>
      <div className="page bg-black w-3/4 mx-auto">
        <Header />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Dashboard />
            </>
          } />
          <Route path="/prize-pool" element={<PrizePoolPage />} />
          <Route path="/chart" element={<TradeDEX />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/draw" element={<DrawPage />} />
          <Route path="*" element={<PrizePoolPage />} />
        </Routes>
      </div>
    </TicketProvider>
  );
}

export default App;
