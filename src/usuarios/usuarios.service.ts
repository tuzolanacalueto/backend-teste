import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Usuario } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { AddUsuarioDto } from './dto/add-usuario.dto';

@Injectable()
export class UsuariosService {
    constructor(private readonly prisma: PrismaService) { }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        return this.prisma.usuario.findUnique({ where: { email } });
    }

    async buscarPorId(id: number): Promise<Usuario | null> {
        return this.prisma.usuario.findUnique({ where: { id } });
    }

    async buscarTodos(): Promise<Usuario[]> {
        return this.prisma.usuario.findMany();
    }

    async atualizar(id: number, dados: Prisma.UsuarioUpdateInput): Promise<Usuario> {
        if (dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha.toString(), 10);
        }
        return this.prisma.usuario.update({
            where: { id: id },
            data: dados,
        });
    }

    async remover(id: number): Promise<Usuario> {
        return this.prisma.usuario.delete({
            where: { id: id },
        });
    }

    async criar(criarUsuarioDto: AddUsuarioDto): Promise<Usuario> {
        const senhaCriptografada = await bcrypt.hash(criarUsuarioDto.senha, 10);
        return this.prisma.usuario.create({
            data: {
                ...criarUsuarioDto,
                senha: senhaCriptografada,
            },
        });
    }
}
