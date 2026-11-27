import 'dotenv/config';
import { prisma } from '../src/prisma';

async function main() {
  await prisma.favouriteRoute.createMany({
    data: [
      { routeName: 'Route 11 - Portage' },
      { routeName: 'Route 18 - North Main' },
      { routeName: 'Route 21 - Portage Express' },
      { routeName: 'Route 47 - Transcona' },
      { routeName: 'Route 60 - Pembina' },
      { routeName: 'Route 75 - University' },
      { routeName: 'Route 16 - Selkirk' },
      { routeName: 'Route 19 - Marion' },
      { routeName: 'Route 24 - Ness' },
      { routeName: 'Route 36 - Northwest Super Express' }
    ]
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });