import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  z-index: 1000;
  padding: 0 2rem;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.background};
    flex-direction: column;
    padding: 1rem;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.primary};
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;

  &.primary {
    background: ${props => props.theme.colors.primary};
    color: white;

    &:hover {
      background: ${props => props.theme.colors.secondary};
    }
  }

  &.secondary {
    background: transparent;
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.border};

    &:hover {
      background: ${props => props.theme.colors.surface};
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  box-shadow: ${props => props.theme.shadows.lg};
  padding: 0.5rem 0;
  min-width: 200px;
  z-index: 1001;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.surface};
  }
`;

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Mock user data - replace with actual authentication
  const user = null; // This should come from your auth context

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    // Implement logout logic
    navigate('/');
  };

  return (
    <NavbarContainer>
      <Logo to="/">
        <i className="fas fa-blog"></i>
        المدونة الاحترافية
      </Logo>

      <NavLinks isOpen={isMenuOpen}>
        <NavLink to="/">الرئيسية</NavLink>
        <NavLink to="/blog">المدونة</NavLink>
        <NavLink to="/categories">التصنيفات</NavLink>
        <NavLink to="/about">حولنا</NavLink>
        <NavLink to="/contact">اتصل بنا</NavLink>
      </NavLinks>

      <AuthButtons>
        {user ? (
          <UserMenu>
            <UserAvatar onClick={toggleUserMenu}>
              {user.first_name?.charAt(0) || 'U'}
            </UserAvatar>
            {isUserMenuOpen && (
              <DropdownMenu
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <DropdownItem to="/profile">الملف الشخصي</DropdownItem>
                <DropdownItem to="/dashboard">لوحة التحكم</DropdownItem>
                <DropdownItem to="/settings">الإعدادات</DropdownItem>
                <DropdownItem as="button" onClick={handleLogout}>
                  تسجيل الخروج
                </DropdownItem>
              </DropdownMenu>
            )}
          </UserMenu>
        ) : (
          <>
            <Button className="secondary" as={Link} to="/login">
              تسجيل الدخول
            </Button>
            <Button className="primary" as={Link} to="/register">
              إنشاء حساب
            </Button>
          </>
        )}
      </AuthButtons>

      <MobileMenuButton onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </MobileMenuButton>
    </NavbarContainer>
  );
}

export default Navbar;
