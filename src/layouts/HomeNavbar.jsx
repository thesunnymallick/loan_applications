import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import logo from '../assets/logo/logo1.png';

const HomeNavbar = ({ textColor = 'text-black' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const menuItems = [
    {
      key: 'home',
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'about',
      label: <Link to="/about">About</Link>,
    },
    {
      key: 'contact',
      label: <Link to="/contact">Contact</Link>,
    },
  ];

  const menu = (
    <Menu
      items={menuItems.map((item) => ({
        ...item,
        label: (
          <Link
            to={item.key === 'home' ? '/' : `/${item.key}`}
            className={`text-lg font-medium hover:text-green-500 ${
              isScrolled ? 'text-zinc-900' : textColor
            }`}
          >
            {item.label.props.children}
          </Link>
        ),
      }))}
    />
  );

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b-[1px] border-zinc-200'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <img className="w-40 h-auto object-cover" src={logo} alt="Logo" />
        {isMobile ? (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button
              type="text"
              icon={<MenuOutlined className="text-2xl" />}
              className="text-lg font-medium"
            />
          </Dropdown>
        ) : (
          <ul className="flex items-center gap-10">
            {menuItems.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.key === 'home' ? '/' : `/${item.key}`}
                  className={`${
                    isScrolled ? 'text-zinc-900' : textColor
                  } text-lg font-medium hover:text-green-500`}
                >
                  {item.label.props.children}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomeNavbar;
