import {
	IsString,
	IsNumber,
	IsUrl,
	IsNotEmpty,
	IsPositive,
	IsOptional,
	Min,
	ValidateIf,
	ValidateNested,
	IsMongoId,
	IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CreateCategoryDto } from './category.dto';
import { CreateSubDocDto } from './sub-doc.dto';

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: `product's name` })
	readonly name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	readonly description: string;

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	@ApiProperty()
	readonly price: number;

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	@ApiProperty()
	readonly stock: number;

	@IsUrl()
	@IsNotEmpty()
	@ApiProperty()
	readonly image: string;

	@IsNotEmpty()
	@ValidateNested()
	@ApiProperty()
	readonly category: CreateCategoryDto;

	@IsNotEmpty()
	@IsMongoId()
	readonly brand: string;

	@IsNotEmpty()
	@ValidateNested()
	readonly subDoc: CreateSubDocDto;

	@IsNotEmpty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateSubDocDto)
	readonly subDocs: CreateSubDocDto[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
	@IsOptional()
	@IsPositive()
	limit: number;

	@IsOptional()
	@Min(0)
	offset: number;

	@IsOptional()
	@Min(0)
	minPrice: number;

	@ValidateIf((params) => params.minPrice)
	@IsPositive()
	maxPrice: number;
}
