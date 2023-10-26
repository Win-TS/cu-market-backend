import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import {
  AddProductDto,
  ProductOutputResponse,
  LastMinBidProductResponse,
} from './dto';
import { ProductService } from './product.service';

@UseGuards(JwtGuard)
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiResponse({ status: 200, description: 'OK', type: ProductOutputResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'GET All Products',
    description: 'GET All Products in Database',
  })
  @Get('all')
  getAllProduct() {
    return this.productService.getAllProduct();
  }

  @ApiResponse({ status: 200, description: 'OK', type: ProductOutputResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'GET Available Products',
    description: 'GET Available Products in Database',
  })
  @Get('available')
  getAvailableProduct(@Query('limit') limit?: string) {
    return this.productService.getAvailableProducts(limit ? Number(limit) : undefined);
  }

  @ApiResponse({ status: 200, description: 'OK', type: ProductOutputResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'GET Expired Products',
    description: 'GET Expired Products in Database',
  })
  @Get('expired')
  getExpiredProduct(@Query('limit') limit?: string) {
    return this.productService.getExpiredProducts(limit ? Number(limit) : undefined);
  }

  @ApiResponse({
    status: 200,
    description: 'OK',
    type: LastMinBidProductResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'GET Products Near Expiry',
    description: 'GET Products Near Expiry from Database',
  })
  @Get('lastmin')
  getProductsNearExpiry(@Query('limit') limit?: string) {
    return this.productService.getProductsNearExpiry(limit ? Number(limit) : undefined);
  }

  @ApiResponse({ status: 200, description: 'OK', type: ProductOutputResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'GET Products By Search Field through Query Parameter',
    description:
      'GET Products By Search Field through Query Parameters in Database',
  })
  @Get('search')
  getProductBySearch(@Query('searchField') searchField: string, @Query('limit') limit?: string) {
    return this.productService.getProductBySearch(searchField, limit ? Number(limit) : undefined);
  }

  @ApiResponse({ status: 200, description: 'OK', type: ProductOutputResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'GET Products Listed by User with Student ID',
    description:
      'GET Products Listed by User with Student ID (Seller) from Database',
  })
  @Get(':studentId')
  getProductsById(@Param('studentId') studentId: string, @Query('limit') limit?: string) {
    return this.productService.getProductsById(studentId, limit ? Number(limit) : undefined);
  }

  @ApiResponse({ status: 200, description: 'OK', type: ProductOutputResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'GET Product Details by Product ID',
    description: 'GET Product Details by Product ID from Database',
  })
  @Get('details/:id')
  getProductDetailsById(@Param('id') id: string) {
    return this.productService.getProductDetailsById(Number(id));
  }

  @ApiResponse({
    status: 201,
    description: 'New Product Created',
    type: ProductOutputResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    type: AddProductDto,
    description: 'Add Product Form JSON, Return as Product Data JSON',
  })
  @ApiOperation({
    summary: 'Create New Product',
    description: 'Create New Product to Database',
  })
  @Post('add')
  addProduct(@Body() dto: AddProductDto) {
    return this.productService.addProduct(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Product Deleted',
    type: ProductOutputResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'Delete Product',
    description:
      'Delete Product from Database using Product ID (id in Product table)',
  })
  @Delete('delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(Number(id));
  }
}
