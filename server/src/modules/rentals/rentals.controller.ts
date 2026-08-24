import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Body, 
  Param, 
  UseGuards 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RentalsService } from './rentals.service';
import { CreateRentalDto, UpdateRentalStatusDto } from './dto/rental.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('Rentals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('api/rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar arriendos del usuario' })
  async findAll(@GetUser('id') userId: string, @GetUser('role') role: string) {
    return this.rentalsService.findAll(userId, role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un arriendo' })
  async findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear solicitud de arriendo de herramienta' })
  async create(@GetUser('id') userId: string, @Body() dto: CreateRentalDto) {
    return this.rentalsService.create(userId, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar estado del arriendo' })
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateRentalStatusDto) {
    return this.rentalsService.updateStatus(id, dto);
  }
}
