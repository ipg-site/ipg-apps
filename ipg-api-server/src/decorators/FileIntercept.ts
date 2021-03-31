import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

export const customFileIntercept = (options: {
  fieldname: string; // file が乗っている body の field
  dest: string; // 保存したい場所
  maxFileSize: number; // 最大画像サイズ
  fileCount: number; // 最大画像枚数
  allowFileTypes: string[]; // 許可する画像形式
}) => {
  return FileInterceptor(options.fieldname, {
    storage: diskStorage({
      destination: options.dest,
    }),
    limits: {
      fileSize: options.maxFileSize,
      files: options.fileCount,
    },
    fileFilter(
      req: any,
      file: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
      },
      callback: (error: Error | null, acceptFile: boolean) => void,
    ) {
      if (!options.allowFileTypes.includes(file.mimetype)) {
        return callback(new BadRequestException('invalid file type.'), false);
      }
      return callback(null, true);
    },
  });
};

export const getUploadDecorator = (
  type: 'abstract' | 'movie' | 'presentation' | 'consent',
) =>
  customFileIntercept({
    fieldname: 'file',
    dest: './uploads/' + type,
    maxFileSize: type === 'movie' ? 10 * 1000 * 1000 : 5 * 1000 * 1000, // 動画:10MB, それ以外: 5MB
    fileCount: 1,
    allowFileTypes: [type === 'movie' ? 'video/mp4' : 'application/pdf'],
  });
