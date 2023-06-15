import { PipeTransform } from '@nestjs/common';
export declare class imdbIDValidationPipe implements PipeTransform<string> {
    transform(value: string): string;
}
