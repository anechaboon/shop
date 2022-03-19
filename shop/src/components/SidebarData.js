import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Product Category',
    path: '/category',
    icon: <MdIcons.MdCategory />,
    cName: 'nav-text'
  },
  {
    title: 'Shop',
    path: '/shop',
    icon: <AiIcons.AiOutlineShop />,
    cName: 'nav-text'
  }
];