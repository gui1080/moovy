import { PipeTransform } from '@nestjs/common';
export declare class StringValidationPipe implements PipeTransform<string> {
    transform(value: string): string;
}
