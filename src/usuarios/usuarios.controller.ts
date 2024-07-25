import { Body, Controller, Post, Get, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { AddUsuarioDto } from './dto/add-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Post('registrar')
    async registrar(@Body() criarUsuarioDto: AddUsuarioDto) {
        return this.usuariosService.criar(criarUsuarioDto);
    }

    @Get()
    async buscarTodos() {
        return this.usuariosService.buscarTodos();
    }

    @Get(':id')
    async buscarUm(@Param('id') id: string) {
        return this.usuariosService.buscarPorId(+id);
    }

    @Get('email/:email')
    async buscarPorEmail(@Param('email') email: string) {
        return this.usuariosService.buscarPorEmail(email);
    }

    @Patch(':id')
    async atualizar(@Param('id') id: string, @Body() atualizarUsuarioDto: UpdateUsuarioDto) {
        return this.usuariosService.atualizar(+id, atualizarUsuarioDto);
    }

    @Delete(':id')
    async remover(@Param('id') id: string) {
        return this.usuariosService.remover(+id);
    }
}
