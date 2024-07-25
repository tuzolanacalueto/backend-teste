import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Transacao } from '@prisma/client';

@Injectable()
export class TransacoesService {
    constructor(private readonly prisma: PrismaService) { }

    async buscarTodas(): Promise<Transacao[]> {
        return this.prisma.transacao.findMany();
    }
}
