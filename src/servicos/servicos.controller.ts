import { Body, Controller, Post, Patch, Param, Delete, Get, UseGuards } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { AddServicoDto } from './dto/add-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Guard de JWT
import { RolesGuard } from '../auth/roles.guard'; // Guard de Roles
import { Roles } from '../auth/roles.decorator'; // Decorador de Roles

@Controller('servicos')
export class ServicosController {
    constructor(private readonly servicosService: ServicosService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Prestador') // Apenas usuários com o papel 'Prestador' podem criar serviços
    async criar(@Body() criarServicoDto: AddServicoDto) {
        return this.servicosService.criar(criarServicoDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard) // Apenas usuários autenticados podem acessar
    async buscarTodos() {
        return this.servicosService.buscarTodos();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard) // Apenas usuários autenticados podem acessar
    async buscarPorId(@Param('id') id: string) {
        return this.servicosService.buscarPorId(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Prestador') // Apenas usuários com o papel 'Prestador' podem atualizar serviços
    async atualizar(@Param('id') id: string, @Body() atualizarServicoDto: UpdateServicoDto) {
        return this.servicosService.atualizar(+id, atualizarServicoDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Prestador') // Apenas usuários com o papel 'Prestador' podem excluir serviços
    async remover(@Param('id') id: string) {
        return this.servicosService.remover(+id);
    }
}
