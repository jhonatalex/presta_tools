import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
  @ApiProperty({ example: 'uuid-de-la-herramienta' })
  @IsString()
  @IsNotEmpty({ message: 'El ID de la herramienta es requerido' })
  toolId: string;

  @ApiProperty({ example: '2026-09-01T10:00:00.000Z' })
  @IsDateString({}, { message: 'Fecha de inicio inválida' })
  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  startDate: string;

  @ApiProperty({ example: '2026-09-05T18:00:00.000Z' })
  @IsDateString({}, { message: 'Fecha de fin inválida' })
  @IsNotEmpty({ message: 'La fecha de fin es requerida' })
  endDate: string;

  @ApiProperty({ example: 'Retiro presencial en Providencia', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateRentalStatusDto {
  @ApiProperty({ example: 'aprobado', enum: ['pendiente', 'aprobado', 'rechazado', 'rentado', 'completado', 'cancelado'] })
  @IsString()
  @IsNotEmpty()
  state: string;
}
