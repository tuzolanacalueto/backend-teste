import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddContratacaoDto } from './dto/add-contratacao.dto';
import { Contratacao, Transacao, Usuario } from '@prisma/client';

@Injectable()
export class ContratacoesService {
    constructor(private readonly prisma: PrismaService) { }

    async criar(criarContratacaoDto: AddContratacaoDto): Promise<Contratacao> {
        const { servicoId, usuarioId, valor } = criarContratacaoDto;

        // Buscar o usuário e o serviço
        const usuario: Usuario = await this.prisma.usuario.findUnique({ where: { id: usuarioId } });
        const servico = await this.prisma.servico.findUnique({ where: { id: servicoId } });

        if (!usuario) throw new NotFoundException('Usuário não encontrado');
        if (!servico) throw new NotFoundException('Serviço não encontrado');

        // Verificar se o usuário tem saldo suficiente
        if (usuario.saldo < valor) throw new BadRequestException('Saldo insuficiente');

        return this.prisma.$transaction(async (prisma) => {
            // Criar a transação
            const transacao: Transacao = await prisma.transacao.create({
                data: {
                    usuarioId: usuario.id,
                    valor,
                },
            });

            // Criar a contratação
            const contratacao: Contratacao = await prisma.contratacao.create({
                data: {
                    servicoId,
                    usuarioId,
                    transacaoId: transacao.id,
                },
            });

            // Atualizar o saldo do usuário e do prestador de serviço
            await prisma.usuario.update({
                where: { id: usuario.id },
                data: { saldo: { decrement: valor } },
            });

            await prisma.usuario.update({
                where: { id: servico.usuarioId },
                data: { saldo: { increment: valor } },
            });

            return contratacao;
        });
    }

    async buscarTodas(): Promise<Contratacao[]> {
        return this.prisma.contratacao.findMany();
    }
}
