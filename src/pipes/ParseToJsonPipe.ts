import { PipeTransform } from '@nestjs/common';

export class ParseToJsonPipe implements PipeTransform<{ body: string }> {
  transform(value: { body: string }) {
    return JSON.parse(value.body);
  }
}
