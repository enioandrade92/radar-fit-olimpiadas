const { PrismaClient } = require('@prisma/client');

const competitions = require('./seedData/competitions');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');
  await prisma.competition.createMany({ data: competitions });
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
