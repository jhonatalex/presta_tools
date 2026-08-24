import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando carga de datos iniciales (Seed)...');

  // 1. Limpiar base de datos
  await prisma.rental.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.category.deleteMany();
  await prisma.lender.deleteMany();
  await prisma.user.deleteMany();

  // 2. Crear Usuarios
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  const userPassword = await bcrypt.hash('User123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@prestatools.cl',
      password: hashedPassword,
      name: 'Administrador',
      lastName: 'PrestaTools',
      telephone: '+56911112222',
      role: 'Manager',
      typeUser: 'Manager',
      isVerified: true,
      verify: true,
    },
  });

  const lenderUser = await prisma.user.create({
    data: {
      email: 'humberto@prestatools.cl',
      password: userPassword,
      name: 'Humberto',
      lastName: 'Barazarte',
      telephone: '+56941623264',
      role: 'lender',
      typeUser: 'lender',
      isVerified: true,
      verify: true,
    },
  });

  await prisma.lender.create({
    data: {
      userId: lenderUser.id,
      companyName: 'Herramientas Profesionales HB SpA',
      taxId: '76.123.456-7',
      address: 'Independencia #2',
      city: 'Santiago',
      verified: true,
    },
  });

  const normalUser = await prisma.user.create({
    data: {
      email: 'cliente@prestatools.cl',
      password: userPassword,
      name: 'Juan',
      lastName: 'Pérez',
      telephone: '+56933334444',
      role: 'user',
      typeUser: 'user',
      isVerified: true,
      verify: true,
    },
  });

  // 3. Crear Categorías
  const catElectricas = await prisma.category.create({
    data: {
      titleCat: 'Herramientas Eléctricas',
      descripCat: 'Taladros, sierras circulares, esmeriles angulares y lijadoras para proyectos profesionales y de bricolaje.',
      urlImagen: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
    },
  });

  const catConstruccion = await prisma.category.create({
    data: {
      titleCat: 'Construcción y Demolición',
      descripCat: 'Rotomartillos, demoledores, betoneras y compactadoras para trabajos pesados en obras.',
      urlImagen: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    },
  });

  const catJardineria = await prisma.category.create({
    data: {
      titleCat: 'Jardinería y Paisajismo',
      descripCat: 'Cortadoras de césped, orilladoras, motosierras y sopladoras de hojas para mantenimiento de áreas verdes.',
      urlImagen: 'https://images.unsplash.com/photo-1599685315640-9ceab2f58944?auto=format&fit=crop&w=600&q=80',
    },
  });

  const catPintura = await prisma.category.create({
    data: {
      titleCat: 'Pintura y Acabados',
      descripCat: 'Pistolas airless para pintar, compresores de aire y lijadoras de muro con aspiradora integrada.',
      urlImagen: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    },
  });

  const catLimpieza = await prisma.category.create({
    data: {
      titleCat: 'Limpieza y Desinfección Industrial',
      descripCat: 'Hidrolavadoras de alta presión, aspiradoras industriales de líquidos/sólidos y pulidoras de piso.',
      urlImagen: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
    },
  });

  const catSoldadura = await prisma.category.create({
    data: {
      titleCat: 'Soldadura y Metalmecánica',
      descripCat: 'Soldadoras inverter MIG/TIG, tronzadoras para metales y caretas fotosensibles profesionales.',
      urlImagen: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    },
  });

  // 4. Crear Herramientas
  await prisma.tool.createMany({
    data: [
      {
        name: 'Taladro Percutor Inalámbrico 20V Max',
        brand: 'DeWalt',
        model: 'DCD796D2',
        description: 'Taladro percutor sin carbones compacto con 2 baterías de 2.0Ah, cargador rápido y maletín. Ideal para perforaciones en concreto, metal y madera.',
        valueRent: 12500,
        state: 'disponible',
        city: 'Santiago',
        commune: 'Providencia',
        urlImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
        rate: 4.9,
        ownerId: lenderUser.id,
        idCat: catElectricas.idCat,
      },
      {
        name: 'Rotomartillo SDS Plus 800W Profesional',
        brand: 'Bosch',
        model: 'GBH 2-26 DRE',
        description: 'Rotomartillo de 3 funciones: taladro, percutor y cincelador con 2.7 Joules de impacto. Incluye juego de cinceles y brocas.',
        valueRent: 15000,
        state: 'disponible',
        city: 'Santiago',
        commune: 'Santiago Centro',
        urlImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
        rate: 5.0,
        ownerId: lenderUser.id,
        idCat: catConstruccion.idCat,
      },
      {
        name: 'Sierra Circular 7-1/4 1800W',
        brand: 'Makita',
        model: 'HS7600',
        description: 'Sierra circular potente para cortes longitudinales y transversales precisos en madera con disco de carburo de tungsteno.',
        valueRent: 14000,
        state: 'disponible',
        city: 'Santiago',
        commune: 'Ñuñoa',
        urlImage: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=600&q=80',
        rate: 4.8,
        ownerId: lenderUser.id,
        idCat: catElectricas.idCat,
      },
      {
        name: 'Hidrolavadora de Alta Presión 145 Bar',
        brand: 'Kärcher',
        model: 'K5 Compact',
        description: 'Hidrolavadora potente con motor refrigerado por agua, manguera de 8 metros y boquilla turbo para limpieza de fachadas y vehículos.',
        valueRent: 18000,
        state: 'rentado',
        dateUp: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Rentado por 5 días más
        city: 'Santiago',
        commune: 'Las Condes',
        urlImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
        rate: 4.9,
        ownerId: lenderUser.id,
        idCat: catLimpieza.idCat,
      },
      {
        name: 'Cortadora de Césped a Gasolina 4.5 HP',
        brand: 'Husqvarna',
        model: 'LC140P',
        description: 'Cortacésped a combustión fácil de encender, con bolsa recolectora de 50L y regulación de altura de corte centralizada.',
        valueRent: 22000,
        state: 'disponible',
        city: 'Valparaíso',
        commune: 'Viña del Mar',
        urlImage: 'https://images.unsplash.com/photo-1599685315640-9ceab2f58944?auto=format&fit=crop&w=600&q=80',
        rate: 5.0,
        ownerId: lenderUser.id,
        idCat: catJardineria.idCat,
      },
      {
        name: 'Soldadora Inverter 200A MMA / TIG LIFT',
        brand: 'Indura',
        model: 'Invercontrol 200',
        description: 'Equipo de soldar portátil y versátil para electrodo revestido y TIG. Incluye pinza porta electrodo y grampa a tierra.',
        valueRent: 16500,
        state: 'disponible',
        city: 'Concepción',
        commune: 'Concepción',
        urlImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
        rate: 4.7,
        ownerId: lenderUser.id,
        idCat: catSoldadura.idCat,
      },
      {
        name: 'Pistola Airless de Pintura 650W',
        brand: 'Wagner',
        model: 'Control Pro 150',
        description: 'Pulverizador de pintura de alta eficiencia sin aire. Pinta muros completos y rejas en minutos con acabado parejo.',
        valueRent: 25000,
        state: 'disponible',
        city: 'Santiago',
        commune: 'Maipú',
        urlImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
        rate: 4.8,
        ownerId: lenderUser.id,
        idCat: catPintura.idCat,
      },
      {
        name: 'Martillo Demoledor Hexagonal 1500W 32J',
        brand: 'DeWalt',
        model: 'D25901K',
        description: 'Demoledor de impacto pesado para rotura de pavimentos, radieres y muros de hormigón armado. Incluye puntero y cincel.',
        valueRent: 28000,
        state: 'disponible',
        city: 'Santiago',
        commune: 'La Florida',
        urlImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
        rate: 4.9,
        ownerId: lenderUser.id,
        idCat: catConstruccion.idCat,
      },
    ],
  });

  console.log('✅ Base de datos inicializada exitosamente con usuarios, categorías y herramientas de prueba.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
