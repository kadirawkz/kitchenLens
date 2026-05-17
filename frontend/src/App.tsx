import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layouts/MainLayout';
import RecipeAssistant from './pages/RecipeAssistant';
import ZeroWaste from './pages/ZeroWaste';
import ReceiptUpload from './pages/ReceiptUpload';
import Budget from './pages/Budget';
import ShoppingList from './pages/ShoppingList';
import Nutrition from './pages/Nutrition';
import './index.css';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="assistant" element={<RecipeAssistant />} />
            <Route path="zero-waste" element={<ZeroWaste />} />
            <Route path="receipts" element={<ReceiptUpload />} />
            <Route path="budget" element={<Budget />} />
            <Route path="shopping" element={<ShoppingList />} />
            <Route path="nutrition" element={<Nutrition />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
