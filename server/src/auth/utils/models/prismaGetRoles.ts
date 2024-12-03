import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUserWithRoles() {
    const user = await prisma.user.findUnique({
        where: { username: 'admin' },
        include: { roles: true }
    });
    console.log('User with roles:', user);
}

getUserWithRoles();
