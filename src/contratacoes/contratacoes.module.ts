import { Module } from '@nestjs/common';
import { ContratacoesService } from './contratacoes.service';
import { ContratacoesController } from './contratacoes.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [ContratacoesController],
    providers: [ContratacoesService, PrismaService],
    exports: [ContratacoesService],
})
export class ContratacoesModule { }
