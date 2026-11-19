import { Link, Outlet } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

// Use aninhado dentro de <ProtectedRoute>: só libera o conteúdo para role "admin".
export default function AdminRoute() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0B1218] text-white flex flex-col items-center justify-center px-6 text-center">
        <ShieldAlert className="w-10 h-10 text-[#d97171] mb-4" />
        <h1 className="text-xl font-light mb-2">Acesso restrito</h1>
        <p className="text-white/50 text-sm max-w-sm mb-6">
          Esta área é exclusiva para administradores da GR Biosport.
        </p>
        <Link to="/" className="text-[#6FA84A] hover:underline text-sm">← Voltar ao site</Link>
      </div>
    );
  }

  return <Outlet />;
}