import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { ToolsService } from '../tools/tools.service';
import { CategoriesService } from '../categories/categories.service';
import { PrismaService } from '../../prisma/prisma.service';

@ApiTags('Legacy Compatibility (Angular Frontend Endpoints)')
@Controller('api')
export class LegacyController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly toolsService: ToolsService,
    private readonly categoriesService: CategoriesService,
    private readonly prisma: PrismaService,
  ) {}

  // USER ROUTES
  @Post('user/login')
  @ApiOperation({ summary: 'Legacy: Iniciar sesión de usuario' })
  async userLogin(@Body() body: any) {
    return this.authService.login({
      email: body.email || body.userName,
      password: body.password,
    });
  }

  @Get('user/list')
  @ApiOperation({ summary: 'Legacy: Listar usuarios' })
  async userList() {
    return this.usersService.findAll();
  }

  @Post('user/insert')
  @ApiOperation({ summary: 'Legacy: Registrar nuevo usuario' })
  async userInsert(@Body() body: any) {
    return this.authService.register({
      email: body.email,
      password: body.password,
      name: body.name || body.nombre,
      lastName: body.lastName || body.apellido,
      telephone: body.telephone || body.telefono,
      rut: body.rut,
      typeUser: body.typeUser || 'user',
    });
  }

  @Get('user/get/:id')
  @ApiOperation({ summary: 'Legacy: Obtener usuario por ID' })
  async userGet(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('user/update')
  @ApiOperation({ summary: 'Legacy: Actualizar usuario' })
  async userUpdate(@Body() body: any) {
    const id = body.id || body.userId;
    return this.usersService.update(id, body);
  }

  // TOOL ROUTES
  @Get('tool/list')
  @ApiOperation({ summary: 'Legacy: Listar todas las herramientas' })
  async toolList() {
    const tools = await this.toolsService.findAll();
    return {
      success: true,
      data: tools,
    };
  }

  @Get('tool/get/:id')
  @ApiOperation({ summary: 'Legacy: Obtener herramienta por ID' })
  async toolGet(@Param('id') id: string) {
    const tool = await this.toolsService.findOne(id);
    return {
      success: true,
      data: tool,
    };
  }

  @Post('tool/insert')
  @ApiOperation({ summary: 'Legacy: Insertar nueva herramienta' })
  async toolInsert(@Body() body: any) {
    let ownerId = body.ownerId || body.userId;
    if (!ownerId) {
      const defaultOwner = await this.prisma.user.findFirst({ where: { role: 'lender' } }) || await this.prisma.user.findFirst();
      ownerId = defaultOwner?.id;
    }

    const created = await this.toolsService.create(ownerId, {
      name: body.name || body.nombre,
      brand: body.brand || body.marca || 'Genérica',
      model: body.model || body.modelo || '',
      description: body.description || body.descripcion || '',
      valueRent: Number(body.valueRent || body.precio || 10000),
      urlImage: body.urlImage || body.imagen || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
      idCat: body.idCat || body.categoryId,
      city: body.city || 'Santiago',
      commune: body.commune || 'Santiago Centro',
    });

    return {
      success: true,
      data: created,
    };
  }

  @Post('tool/edit')
  @ApiOperation({ summary: 'Legacy: Editar herramienta' })
  async toolEdit(@Body() body: any) {
    const id = body.id || body.toolId;
    const tool = await this.toolsService.findOne(id);
    const updated = await this.toolsService.update(id, tool.ownerId, 'admin', body);
    return {
      success: true,
      data: updated,
    };
  }

  @Get('tool/delete/:id')
  @Delete('tool/delete/:id')
  @ApiOperation({ summary: 'Legacy: Eliminar herramienta' })
  async toolDelete(@Param('id') id: string) {
    const tool = await this.toolsService.findOne(id);
    const deleted = await this.toolsService.remove(id, tool.ownerId, 'admin');
    return {
      success: true,
      data: deleted,
    };
  }

  // CATEGORY ROUTES
  @Get('Categoria/list')
  @ApiOperation({ summary: 'Legacy: Listar categorías' })
  async categoryList() {
    const categories = await this.categoriesService.findAll();
    return {
      success: true,
      data: categories,
    };
  }

  @Get('Categoria/get/:id')
  @ApiOperation({ summary: 'Legacy: Obtener categoría por ID' })
  async categoryGet(@Param('id') id: string) {
    const cat = await this.categoriesService.findOne(id);
    return {
      success: true,
      data: cat,
    };
  }

  @Post('Categoria/insert')
  @ApiOperation({ summary: 'Legacy: Insertar categoría' })
  async categoryInsert(@Body() body: any) {
    const created = await this.categoriesService.create({
      titleCat: body.titleCat || body.nombre,
      descripCat: body.descripCat || body.descripcion,
      urlImagen: body.urlImagen || body.imagen,
    });
    return {
      success: true,
      data: created,
    };
  }

  // LENDER ROUTES
  @Get('lender/list')
  @ApiOperation({ summary: 'Legacy: Listar prestamistas' })
  async lenderList() {
    const lenders = await this.prisma.lender.findMany({
      include: { user: true },
    });
    return {
      success: true,
      data: lenders,
    };
  }

  @Post('lender/insert')
  @ApiOperation({ summary: 'Legacy: Registrar prestamista' })
  async lenderInsert(@Body() body: any) {
    const userId = body.userId || body.id;
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: 'lender', typeUser: 'lender', isVerified: true, verify: true },
    });

    return this.prisma.lender.create({
      data: {
        userId,
        companyName: body.companyName || body.razonSocial,
        taxId: body.taxId || body.rut,
        address: body.address || body.direccion,
        city: body.city || 'Santiago',
        verified: true,
      },
    });
  }

  @Get('lender/get/:id')
  @ApiOperation({ summary: 'Legacy: Obtener prestamista por ID' })
  async lenderGet(@Param('id') id: string) {
    return this.prisma.lender.findFirst({
      where: { OR: [{ id }, { userId: id }] },
      include: { user: true },
    });
  }

  // PAYMENT ROUTES (TRANSBANK WEBPAY SIMULATION)
  @Post('Venta/iniciar-transaccion')
  @ApiOperation({ summary: 'Legacy: Iniciar transacción de pago simulada' })
  async initTransaction(@Body() body: any) {
    const token = 'tbk_token_' + Math.random().toString(36).substring(2, 15);
    return {
      token,
      url: 'http://localhost:4200/confirmacion-arriendo?token_ws=' + token,
      status: 'INITIALIZED',
    };
  }

  @Post('Venta/confirmar-transaccion')
  @ApiOperation({ summary: 'Legacy: Confirmar transacción de pago' })
  async commitTransaction(@Body() body: any) {
    return {
      response_code: 0,
      status: 'AUTHORIZED',
      amount: body.amount || 15000,
      authorization_code: '123456',
      transaction_date: new Date().toISOString(),
      message: 'Transacción aprobada con éxito',
    };
  }
}
