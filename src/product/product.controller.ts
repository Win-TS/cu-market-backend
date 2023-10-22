import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { AddProductDto, EditProductDto } from './dto';
import { ProductService } from './product.service';

@UseGuards(JwtGuard)
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiResponse({ status: 200, description: 'GET All Products' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('all')
  getAllProduct() {
    return this.productService.getAllProduct();
  }

  @ApiResponse({ status: 201, description: 'New Product Created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    type: AddProductDto,
    description: 'Add Product Form JSON, Return as Product Data JSON',
  })
  @Post('add')
  addProduct(@Body() dto: AddProductDto) {
    return this.productService.addProduct(dto);
  }

  @ApiResponse({ status: 200, description: 'Product Edited' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    type: EditProductDto,
    description: 'Edit Product Form JSON, Return as Product Data JSON',
  })
  @Put('edit')
  editProduct(@Body() dto: EditProductDto) {
    return this.productService.editProduct(dto);
  }

  @ApiResponse({ status: 200, description: 'Product Deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete('delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(Number(id));
  }
}
