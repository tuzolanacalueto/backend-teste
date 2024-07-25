import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ContratacoesService } from './contratacoes.service';
import { AddContratacaoDto } from './dto/add-contratacao.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('contratacoes')
export class ContratacoesController {
    constructor(private readonly contratacoesService: ContratacoesService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Cliente') // Apenas usuários com o papel 'Cliente' podem criar contratações
    async criar(@Body() criarContratacaoDto: AddContratacaoDto) {
        return this.contratacoesService.criar(criarContratacaoDto);
    }

    @Get()
    async buscarTodas() {
        return this.contratacoesService.buscarTodas();
    }
}
