
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class imdbIDValidationPipe implements PipeTransform<string> {
    transform(value: string): string {
        
        // checks if empty
        if (!value || typeof value !== 'string') {
            throw new BadRequestException('imdbID must be a string!');
        }

        // regex expression is true when:
        // string is between 5 and 15 chars
        // contains both letters and numbers
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,15}$/;
        const isValid = regex.test(value);

        if (!isValid) {
            throw new BadRequestException(
                'imdbID string must contain both letters and numbers, and have a length between 5 and 15 characters',
            );
        }

        return value;
    }
}