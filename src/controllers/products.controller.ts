import {
	Controller,
	Get,
	Param,
	Query,
	Post,
	Body,
	Put,
	Delete,
	HttpStatus,
	HttpCode,
	Res,
} from '@nestjs/common';

import { Response } from 'express';

@Controller('products')
export class ProductsController {
	@Get()
	getProducts(
		@Query('limit') limit = 100,
		@Query('offset') offset = 0,
		@Query('brand') brand: string,
	) {
		return `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`;
	}

	@Get('filter')
	getProductFilter() {
		return `yo soy un filter`;
	}

	@Get(':productId')
	@HttpCode(HttpStatus.ACCEPTED)
	getOne(@Res() response: Response, @Param('productId') productId: string) {
		response.status(200).send({
			message: `product ${productId}`,
		});
	}

	@Post('product')
	createProducto(@Body() body: any): any {
		return {
			name: body.name,
			price: body.price,
		};
	}

	@Put('product/:idProduct')
	updateProducto(
		@Param('idProduct') idProduct: string,
		@Body() body: any,
	): any {
		return {
			idProduct: idProduct,
			name: body.newName,
			price: body.newPrice,
		};
	}

	@Delete('product')
	deleteProducto(@Param('idProduct') idProduct: string): any {
		return {
			idProduct: idProduct,
			delete: true,
			count: 1,
		};
	}
}
