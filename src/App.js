import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage';


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
