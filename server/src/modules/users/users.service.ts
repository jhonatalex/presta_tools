import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
        telephone: true,
        rut: true,
        role: true,
        typeUser: true,
        isVerified: true,
        verify: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
        telephone: true,
        rut: true,
        role: true,
        typeUser: true,
        isVerified: true,
        verify: true,
        avatarUrl: true,
        createdAt: true,
        lenderProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
        telephone: true,
        role: true,
        typeUser: true,
        isVerified: true,
        verify: true,
      },
    });
  }
}
