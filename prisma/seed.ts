import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.create({
    data: {
      email: 'admin@empresa.com',
      password: passwordHash,
      role: 'ADMIN',
      status: true,
    },
  });

  console.log('Usuario ADMIN creado correctamente');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
