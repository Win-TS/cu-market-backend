import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { AddProductDto, EditProductDto } from './dto';
import { ProductService } from './product.service';

@UseGuards(JwtGuard)
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'GET All Products', description: 'GET All Products in Database'})
  @Get('all')
  getAllProduct() {
    return this.productService.getAllProduct();
  }

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'GET Available Products', description: 'GET Available Products in Database'})
  @Get('available')
  getAvailableProduct() {
    return this.productService.getAvailableProducts();
  }

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'GET Expired Products', description: 'GET Expired Products in Database'})
  @Get('expired')
  getExpiredProduct() {
    return this.productService.getExpiredProducts();
  }

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'GET Products Listed by User with Student ID', description: 'GET Products Listed by User with Student ID (Seller) from Database'})
  @Get(':studentId')
  getProductsById(@Param('studentId') studentId: string) {
    return this.productService.getProductsById(studentId);
  }

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'GET Product Details by Product ID', description: 'GET Product Details by Product ID from Database'})
  @Get('details/:id')
  getProductDetailsById(@Param('id') id: string) {
    return this.productService.getProductDetailsById(Number(id));
  }

  @ApiResponse({ status: 201, description: 'New Product Created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    type: AddProductDto,
    description: 'Add Product Form JSON, Return as Product Data JSON',
  })
  @ApiOperation({ summary: 'Create New Product', description: 'Create New Product to Database'})
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
  @ApiOperation({ summary: 'Edit Product', description: 'Edit Product in Database'})
  @Put('edit')
  editProduct(@Body() dto: EditProductDto) {
    return this.productService.editProduct(dto);
  }

  @ApiResponse({ status: 200, description: 'Product Deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Delete Product', description: 'Delete Product from Database using Product ID (id in Product table)'})
  @Delete('delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(Number(id));
  }
}
