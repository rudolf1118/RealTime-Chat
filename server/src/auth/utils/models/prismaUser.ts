import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser() {
    const adminRole = await prisma.role.findUnique({
        where: { value: 'ADMIN' }
    });

    const user = await prisma.user.create({
        data: {
            username: 'admin',
            password: 'securepassword',
            roles: { connect: { id: adminRole.id } }
        }
    });

    console.log('User created:', user);
}

createUser();