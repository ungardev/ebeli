// An array of links for navigation bar
const navBarLinks = [
  { name: 'Inicio', url: '/' },
  { name: 'Productos', url: '/products' },
  { name: 'Distribuidor', url: '/distribuidor' },
  { name: 'Ubícanos', url: '/ubicarnos' },
  { name: 'Nosotros', url: '/#nosotros' },
  { name: 'Contacto', url: '/contact' },
];

// An array of links for footer
const footerLinks = [
  {
    section: 'Explorar',
    links: [
      { name: 'Productos', url: '/products' },
      { name: 'Distribuidor', url: '/distribuidor' },
      { name: 'Nosotros', url: '/#nosotros' },
      { name: 'Contacto', url: '/contact' },
    ],
  },
];

// An object of links for social icons
const socialLinks = {
  facebook: '#',
  x: '#',
  github: '#',
  google: '#',
  slack: '#',
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};
