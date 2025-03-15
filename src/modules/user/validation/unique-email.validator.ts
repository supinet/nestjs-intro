import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {

    constructor(private userService: UserService) {}

    async validate(value: any): Promise<boolean> {
        try {
            const userWithEmailExists = await this.userService.getByEmail(
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