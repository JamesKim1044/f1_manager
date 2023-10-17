import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirversModule } from './dirvers/dirvers.module';
import { TeamsModule } from './teams/teams.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Driver } from './dirvers/entities/dirver.entity';
import { Team } from './teams/entities/team.entity';
import { ManagerModule } from './manager/manager.module';
import { Manager } from './manager/entities/manager.entity';
import { AuthModule } from './auth/auth.module';
import {JwtModule} from '@nestjs/jwt';


@Module({
  imports: [DirversModule, TeamsModule,ManagerModule, AuthModule,
    
    ConfigModule.forRoot({
      envFilePath : ['.development.env'],
    }),
    TypeOrmModule.forRoot({
      type : "mysql",
      host : process.env.DB_HOST,
      port : parseInt(process.env.DB_PORT),
      username : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_DATABASE,
      entities : [Manager],
      synchronize : false
    })
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
