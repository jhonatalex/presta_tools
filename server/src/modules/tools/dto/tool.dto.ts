import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateToolDto {
  @ApiProperty({ example: 'Taladro Percutor Inalámbrico 20V' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  name: string;

  @ApiProperty({ example: 'DeWalt' })
  @IsString()
  @IsNotEmpty({ message: 'La marca es obligatoria' })
  brand: string;

  @ApiProperty({ example: 'DCD796D2', required: false })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiProperty({ example: 'Taladro inalámbrico con 2 baterías de litio y maletín.' })
  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  description: string;

  @ApiProperty({ example: 12500 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  valueRent: number;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80' })
  @IsString()
  @IsNotEmpty({ message: 'La imagen principal es obligatoria' })
  urlImage: string;

  @ApiProperty({ example: 'uuid-de-categoria' })
  @IsString()
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  idCat: string;

  @ApiProperty({ example: 'Santiago', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'Providencia', required: false })
  @IsString()
  @IsOptional()
  commune?: string;
}

export class UpdateToolDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  valueRent?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  urlImage?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  idCat?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  state?: string;
}
