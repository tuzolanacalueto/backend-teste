import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ServicosModule } from './servicos/servicos.module';
import { ContratacoesModule } from './contratacoes/contratacoes.module';
import { TransacoesModule } from './transacoes/transacoes.module';

@Module({
  imports: [AuthModule, UsuariosModule, ServicosModule, ContratacoesModule, TransacoesModule],
  providers: [PrismaService],
})
export class AppModule { }
