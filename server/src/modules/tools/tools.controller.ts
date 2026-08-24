import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ToolsService } from './tools.service';
import { CreateToolDto, UpdateToolDto } from './dto/tool.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('Tools')
@Controller('api/tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar herramientas con filtros de búsqueda' })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'state', required: false })
  async findAll(
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
    @Query('city') city?: string,
    @Query('state') state?: string,
  ) {
    return this.toolsService.findAll({ categoryId, search, city, state });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de una herramienta por ID' })
  async findOne(@Param('id') id: string) {
    return this.toolsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publicar una nueva herramienta para alquiler' })
  async create(
    @GetUser('id') userId: string,
    @Body() dto: CreateToolDto,
  ) {
    return this.toolsService.create(userId, dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar datos de una herramienta' })
  async update(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @GetUser('role') userRole: string,
    @Body() dto: UpdateToolDto,
  ) {
    return this.toolsService.update(id, userId, userRole, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una herramienta' })
  async remove(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @GetUser('role') userRole: string,
  ) {
    return this.toolsService.remove(id, userId, userRole);
  }
}
