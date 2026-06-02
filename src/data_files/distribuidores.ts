export interface Distribuidor {
  id: string;
  nombre: string;
  estado: string;
  ciudad: string;
  telefono: string;
  email: string;
  tipo: 'cliente' | 'distribuidor';
}

export const estadosVenezuela = [
  'Amazonas',
  'Anzoátegui',
  'Apure',
  'Aragua',
  'Barinas',
  'Bolívar',
  'Carabobo',
  'Cojedes',
  'Delta Amacuro',
  'Distrito Capital',
  'Falcón',
  'Guárico',
  'Lara',
  'Mérida',
  'Miranda',
  'Monagas',
  'Nueva Esparta',
  'Portuguesa',
  'Sucre',
  'Táchira',
  'Trujillo',
  'La Guaira',
  'Yaracuy',
  'Zulia',
] as const;

export type Estado = (typeof estadosVenezuela)[number];

export const mockDistribuidores: Distribuidor[] = [
  {
    id: 'dist-001',
    nombre: 'Iluminación Caracas C.A.',
    estado: 'Distrito Capital',
    ciudad: 'Caracas',
    telefono: '+58 212 555-0101',
    email: 'ventas@iluminacioncaracas.com.ve',
    tipo: 'cliente',
  },
  {
    id: 'dist-002',
    nombre: 'Electro Servicios del Zulia',
    estado: 'Zulia',
    ciudad: 'Maracaibo',
    telefono: '+58 261 555-0202',
    email: 'info@electrozulia.com.ve',
    tipo: 'distribuidor',
  },
  {
    id: 'dist-003',
    nombre: 'Luminarias Miranda C.A.',
    estado: 'Miranda',
    ciudad: 'Los Teques',
    telefono: '+58 212 555-0303',
    email: 'contacto@luminariasmiranda.com.ve',
    tipo: 'cliente',
  },
  {
    id: 'dist-004',
    nombre: 'Ilumina Valencia',
    estado: 'Carabobo',
    ciudad: 'Valencia',
    telefono: '+58 241 555-0404',
    email: 'ventas@iluminaValencia.com.ve',
    tipo: 'distribuidor',
  },
  {
    id: 'dist-005',
    nombre: 'Técnica Eléctrica Lara',
    estado: 'Lara',
    ciudad: 'Barquisimeto',
    telefono: '+58 251 555-0505',
    email: 'info@tecnicaelectricalara.com.ve',
    tipo: 'cliente',
  },
  {
    id: 'dist-006',
    nombre: 'Iluminación Total Bolívar',
    estado: 'Bolívar',
    ciudad: 'Ciudad Bolívar',
    telefono: '+58 285 555-0606',
    email: 'ventas@iluminaciontotalbolivar.com.ve',
    tipo: 'distribuidor',
  },
  {
    id: 'dist-007',
    nombre: 'Servicios Eléctricos Aragua',
    estado: 'Aragua',
    ciudad: 'Maracay',
    telefono: '+58 243 555-0707',
    email: 'contacto@servicioselectricosaragua.com.ve',
    tipo: 'cliente',
  },
  {
    id: 'dist-008',
    nombre: 'Ilumina Táchira',
    estado: 'Táchira',
    ciudad: 'San Cristóbal',
    telefono: '+58 276 555-0808',
    email: 'info@iluminatachira.com.ve',
    tipo: 'distribuidor',
  },
  {
    id: 'dist-009',
    nombre: 'Luces del Centro C.A.',
    estado: 'Carabobo',
    ciudad: 'Puerto Cabello',
    telefono: '+58 242 555-0909',
    email: 'ventas@lucesdelcentro.com.ve',
    tipo: 'cliente',
  },
  {
    id: 'dist-010',
    nombre: 'Iluminación Maracaibo',
    estado: 'Zulia',
    ciudad: 'Maracaibo',
    telefono: '+58 261 555-1010',
    email: 'contacto@iluminacionmaracaibo.com.ve',
    tipo: 'cliente',
  },
];

export const geoJsonUrl =
  'https://raw.githubusercontent.com/fckfck97/Mapa-de-Venezuela-GeoJson/main/venezuela.geojson';
