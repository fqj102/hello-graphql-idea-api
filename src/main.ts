import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import {Logger} from '@nestjs/common';

import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

const port = process.env.PORT || 4000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});
    app.enableCors({
        origin: [
            'http://localhost:4200', // angular
            'http://localhost:3000', // react
            'http://localhost:8081', // react-native
        ],
    });

    const options = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();

    // @ts-ignore
    const catDocument = SwaggerModule.createDocument(app, options, {ignoreGlobalPrefix: true});
    SwaggerModule.setup('docs', app, catDocument);

    await app.listen(port);
    Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
