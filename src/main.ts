import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(parseInt(process.env.PORT, 10) || 7011);
  console.log(parseInt(process.env.PORT, 10) || 7011);
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
