import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import z, { ZodError, ZodObject } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject) {}

  transform(value: any) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: z.flattenError(error),
        });
      }

      throw new BadRequestException('An unexpected validation error occurred');
    }
  }
}
