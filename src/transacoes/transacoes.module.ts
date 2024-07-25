import { Module } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { TransacoesController } from './transacoes.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [TransacoesController],
    providers: [TransacoesService, PrismaService],
})
export class TransacoesModule { }
