import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { AwsService } from './aws.service';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtGuard)
@ApiTags('AWS')
@Controller('aws')
export class AwsController {
  constructor(private awsService: AwsService) {}

  @ApiResponse({
    status: 201,
    description: 'New Product Created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.awsService.uploadFile(file);
  }

  @Delete('delete-image/:key')
  deleteFile(@Param('key') key: string) {
    return this.awsService.deleteFile(key);
  }
}
