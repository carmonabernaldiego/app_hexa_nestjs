import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  CACHE_MANAGER,
  UseInterceptors,
  CacheKey,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';
import { ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtRestAuthGuard } from '../_common/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtRestAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: any,
  ) {}

  @ApiOperation({
    summary: 'Crea un nuevo usuario',
  })
  @ApiBody({
    type: CreateUserRequestDto,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserRequestDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Muestra todos los usuarios',
    description: 'Estos datos están una hora en cache',
  })
  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('users')
  @CacheTTL(30) // 30 segundos
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener usuario por ID',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @ApiOperation({
    summary: 'Actualizar usuario',
  })
  @ApiBody({
    type: UpdateUserRequestDto,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Eliminar usuario',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
