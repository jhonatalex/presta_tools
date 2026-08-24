import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRentalDto, UpdateRentalStatusDto } from './dto/rental.dto';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId?: string, role?: string) {
    const where: any = {};
    if (role !== 'Manager' && role !== 'admin' && userId) {
      where.OR = [
        { renterId: userId },
        { tool: { ownerId: userId } },
      ];
    }

    return this.prisma.rental.findMany({
      where,
      include: {
        tool: {
          select: {
            id: true,
            name: true,
            brand: true,
            urlImage: true,
            ownerId: true,
          },
        },
        renter: {
          select: {
            id: true,
            name: true,
            lastName: true,
            email: true,
            telephone: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
      include: {
        tool: { include: { owner: true } },
        renter: true,
      },
    });

    if (!rental) {
      throw new NotFoundException(`Arriendo con ID ${id} no encontrado`);
    }

    return rental;
  }

  async create(renterId: string, dto: CreateRentalDto) {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);

    if (end <= start) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
    }

    const tool = await this.prisma.tool.findUnique({
      where: { id: dto.toolId },
    });

    if (!tool) {
      throw new NotFoundException(`Herramienta con ID ${dto.toolId} no encontrada`);
    }

    if (tool.ownerId === renterId) {
      throw new BadRequestException('No puedes alquilar tu propia herramienta');
    }

    // Calcular días y monto
    const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
    const totalAmount = diffDays * tool.valueRent;

    const rental = await this.prisma.rental.create({
      data: {
        toolId: dto.toolId,
        renterId,
        startDate: start,
        endDate: end,
        totalDays: diffDays,
        dailyPrice: tool.valueRent,
        totalAmount,
        notes: dto.notes,
        state: 'pendiente',
        paymentStatus: 'pagado', // Simulado
      },
      include: {
        tool: true,
        renter: {
          select: {
            id: true,
            name: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return rental;
  }

  async updateStatus(id: string, dto: UpdateRentalStatusDto) {
    const rental = await this.findOne(id);

    const updated = await this.prisma.rental.update({
      where: { id },
      data: { state: dto.state },
    });

    // Actualizar estado de la herramienta
    if (dto.state === 'rentado' || dto.state === 'aprobado') {
      await this.prisma.tool.update({
        where: { id: rental.toolId },
        data: { state: 'rentado', dateUp: rental.endDate },
      });
    } else if (dto.state === 'completado' || dto.state === 'cancelado') {
      await this.prisma.tool.update({
        where: { id: rental.toolId },
        data: { state: 'disponible', dateUp: null },
      });
    }

    return updated;
  }
}
