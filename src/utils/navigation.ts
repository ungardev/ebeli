// An array of links for navigation bar
const navBarLinks = [
  { name: 'Home', url: '/' },
  { name: 'Products', url: '/products' },
  { name: 'Services', url: '/services' },
  { name: 'Blog', url: '/blog' },
  { name: 'Contact', url: '/contact' },
];

// An array of links for footer
const footerLinks = [
  {
    section: 'Products',
    links: [
      { name: 'LED Lighting', url: '/products' },
      { name: 'LED Strips', url: '/products' },
      { name: 'Controllers', url: '/products' },
    ],
  },
  {
    section: 'Company',
    links: [
      { name: 'About us', url: '#' },
      { name: 'Blog', url: '/blog' },
      { name: 'Contact', url: '/contact' },
    ],
  },
];

// An object of links for social icons
const socialLinks = {
  facebook: 'https://www.facebook.com/ebeli',
  x: 'https://www.x.com/ebeli',
  github: 'https://github.com/ungardev/ebeli',
  google: '#',
  slack: '#',
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};
