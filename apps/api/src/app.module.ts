import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StoriesModule } from './modules/stories/stories.module';
import { AiModule } from './modules/ai/ai.module';
import { CollaborationModule } from './modules/collaboration/collaboration.module';
import { MediaModule } from './modules/media/media.module';
import { ParentalGuidanceModule } from './modules/parental-guidance/parental-guidance.module';
import typeOrmConfig from './database/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig), 
    AuthModule,
    UsersModule,
    StoriesModule,
    AiModule,
    CollaborationModule,
    MediaModule,
    ParentalGuidanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
