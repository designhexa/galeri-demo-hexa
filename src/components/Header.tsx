
import { useAuth } from '@/context/AuthContext';
import { HexaButton } from './ui/hexa-button';
import { LogIn, LogOut, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onRoleToggle: () => void;
}

const Header = ({ onRoleToggle }: HeaderProps) => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const isAdmin = currentUser?.role === 'admin';
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-hexa-red to-hexa-dark-red text-white py-4 px-6 sm:px-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/">
            <h1 className="text-2xl font-bold">Hexa Integra Mandiri</h1>
          </Link>
        </div>
                       
        <div className="flex items-center gap-3">
          {isAuthenticated && isAdmin ? (
            <>
              <Link to="/users">
                <HexaButton 
                  variant="ghost" 
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10"
                >
                  <Users size={16} />
                  <span className="hidden sm:inline">Manage Users</span>
                </HexaButton>
              </Link>
              
              <div className="flex items-center gap-2 bg-gradient-to-r from-hexa-red/10 to-hexa-dark-red/10 px-3 py-1.5 rounded-full text-sm">
                <span className="w-2 h-2 rounded-full animate-hexa-pulse bg-hexa-red"></span>
                <span className="font-medium">Admin</span>
              </div>

              <HexaButton 
                variant="ghost" 
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </HexaButton>
            </>
          ) : (
            <Link to="/login">
              <HexaButton 
                variant="ghost" 
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10"
              >
                <LogIn size={16} />
                <span className="hidden sm:inline">Admin Login</span>
              </HexaButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
