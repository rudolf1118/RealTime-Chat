import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createRole () {
    const role = await prisma.role.create({
        data: {
            value: 'ADMIN'
        }
    });
    console.log('Role created:', role);
}

createRole();