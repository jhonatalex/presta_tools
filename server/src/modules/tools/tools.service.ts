import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateToolDto, UpdateToolDto } from './dto/tool.dto';

@Injectable()
export class ToolsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query?: { categoryId?: string; search?: string; city?: string; state?: string }) {
    const where: any = {};

    if (query?.categoryId) {
      where.idCat = query.categoryId;
    }

    if (query?.state) {
      where.state = query.state;
    }

    if (query?.city) {
      where.city = { contains: query.city };
    }

    if (query?.search) {
      where.OR = [
        { name: { contains: query.search } },
        { brand: { contains: query.search } },
        { description: { contains: query.search } },
        { model: { contains: query.search } },
      ];
    }

    return this.prisma.tool.findMany({
      where,
      include: {
        category: true,
        owner: {
          select: {
            id: true,
            name: true,
            lastName: true,
            email: true,
            telephone: true,
            isVerified: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const tool = await this.prisma.tool.findUnique({
      where: { id },
      include: {
        category: true,
        owner: {
          select: {
            id: true,
            name: true,
            lastName: true,
            email: true,
            telephone: true,
            isVerified: true,
            avatarUrl: true,
          },
        },
        rentals: {
          where: { state: { in: ['aprobado', 'rentado'] } },
          select: {
            startDate: true,
            endDate: true,
            state: true,
          },
        },
      },
    });

    if (!tool) {
      throw new NotFoundException(`Herramienta con ID ${id} no encontrada`);
    }

    return tool;
  }

  async create(ownerId: string, dto: CreateToolDto) {
    return this.prisma.tool.create({
      data: {
        ...dto,
        ownerId,
        state: 'disponible',
      },
      include: {
        category: true,
        owner: {
          select: {
            id: true,
            name: true,
            lastName: true,
          },
        },
      },
    });
  }

  async update(id: string, userId: string, userRole: string, dto: UpdateToolDto) {
    const tool = await this.findOne(id);

    if (tool.ownerId !== userId && userRole !== 'Manager' && userRole !== 'admin') {
      throw new ForbiddenException('No tienes permisos para modificar esta herramienta');
    }

    return this.prisma.tool.update({
      where: { id },
      data: dto,
      include: {
        category: true,
      },
    });
  }

  async remove(id: string, userId: string, userRole: string) {
    const tool = await this.findOne(id);

    if (tool.ownerId !== userId && userRole !== 'Manager' && userRole !== 'admin') {
      throw new ForbiddenException('No tienes permisos para eliminar esta herramienta');
    }

    return this.prisma.tool.delete({
      where: { id },
    });
  }
}
