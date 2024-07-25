import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddServicoDto } from './dto/add-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Prisma, Servico } from '@prisma/client';

@Injectable()
export class ServicosService {
    constructor(private readonly prisma: PrismaService) { }

    async criar(criarServicoDto: AddServicoDto): Promise<Servico> {
        return this.prisma.servico.create({
            data: criarServicoDto,
        });
    }

    async buscarTodos(): Promise<Servico[]> {
        return this.prisma.servico.findMany();
    }

    async buscarPorId(id: number): Promise<Servico> {
        const servico = await this.prisma.servico.findUnique({
            where: { id },
        });
        if (!servico) {
            throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
        }
        return servico;
    }

    async atualizar(id: number, atualizarServicoDto: UpdateServicoDto): Promise<Servico> {
        const servico = await this.prisma.servico.update({
            where: { id },
            data: atualizarServicoDto,
        });
        if (!servico) {
            throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
        }
        return servico;
    }

    async remover(id: number): Promise<Servico> {
        const servico = await this.prisma.servico.delete({
            where: { id },
        });
        if (!servico) {
            throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
        }
        return servico;
    }
}
