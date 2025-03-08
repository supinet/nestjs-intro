import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {

    constructor(private userRepository: UserRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        try {
            const userWithEmailExists = await this.userRepository.existWithEmail(
                value
            );
            return !userWithEmailExists;
        } catch (error) {
            if (error instanceof NotFoundException) {
                return true;
            }
            throw error;
        }
    }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
    return (object: Object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailValidator
        });
    };
};