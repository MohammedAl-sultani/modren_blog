import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background};
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
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
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
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;

  &.primary {
    background: ${props => props.theme.colors.primary};
    color: white;

    &:hover {
      background: ${props => props.theme.colors.secondary};
    }
  }

  &.secondary {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};

    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isAuthenticated = localStorage.getItem('token');

  return (
    <NavbarContainer>
      <Logo to="/">مدونة احترافية</Logo>
      
      <NavLinks isOpen={isMenuOpen}>
        <NavLink to="/">الرئيسية</NavLink>
        <NavLink to="/blog">المدونة</NavLink>
        <NavLink to="/about">حول</NavLink>
        <NavLink to="/contact">اتصل بنا</NavLink>
        
        <AuthButtons>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard">لوحة التحكم</NavLink>
              <Button className="secondary" onClick={handleLogout}>
                تسجيل الخروج
              </Button>
            </>
          ) : (
            <>
              <Button className="secondary" onClick={() => navigate('/login')}>
                تسجيل الدخول
              </Button>
              <Button className="primary" onClick={() => navigate('/register')}>
                إنشاء حساب
              </Button>
            </>
          )}
        </AuthButtons>
      </NavLinks>

      <MobileMenuButton onClick={toggleMenu}>
        ☰
      </MobileMenuButton>
    </NavbarContainer>
  );
};

export default Navbar;
