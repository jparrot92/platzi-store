import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@UseGuards(ApiKeyGuard)
	@Get('nuevo')
	newEndpoint() {
		return 'yo soy nuevo';
	}

	@Get('/ruta/')
	hello() {
		return 'con /sas/';
	}

	@Get('/tasks/')
	getTasks() {
		return this.appService.getTasks();
	}
}
