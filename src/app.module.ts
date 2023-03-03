import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Module({
	imports: [HttpModule, UsersModule, ProductsModule, DatabaseModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: 'TASKS',
			useFactory: async (http: HttpService) => {
				const response = http.get(
					'https://jsonplaceholder.typicode.com/todos',
				);
				const tasks = await firstValueFrom(response);
				return tasks.data;
			},
			inject: [HttpService],
		},
	],
})
export class AppModule {}
