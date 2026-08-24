import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });

    if (existing) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const role = dto.typeUser || 'user';

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase().trim(),
        password: hashedPassword,
        name: dto.name,
        lastName: dto.lastName,
        telephone: dto.telephone,
        rut: dto.rut || null,
        role: role,
        typeUser: role,
        isVerified: true,
        verify: true,
      },
    });

    const token = this.generateToken(user);
    const { password, ...userData } = user;

    return {
      message: 'Usuario registrado exitosamente',
      user: userData,
      token,
    };
  }

  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase().trim();
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = this.generateToken(user);
    const { password, ...userData } = user;

    return {
      message: 'Inicio de sesión exitoso',
      user: userData,
      token,
      // Retrocompatibilidad con el frontend de Angular
      access_token: token,
    };
  }

  private generateToken(user: { id: string; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}
