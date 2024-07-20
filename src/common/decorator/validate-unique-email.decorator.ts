// // validate-unique-email.decorator.ts
// import { Injectable } from '@nestjs/common';
// import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
// import { ModuleRef } from '@nestjs/core';
// import { DatabaseService } from '../../database/database.service';
// import { UserService } from '../../domain/user/user.service';

// @Injectable()
// @ValidatorConstraint({ async: true })
// export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {

//     constructor(private userService: UserService) {
  
//         console.log('userService', this.userService);
//     }

    
//     // async validate(email: string) {
//     //     const user = await this.userService.findOneOrFailEmail(email);
//     //     console.log('User found:', user);
//     //     return !user;
//     // }
// }

// export function IsEmailUnique(validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string) {
//         registerDecorator({
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             constraints: [propertyName],
//             validator: IsEmailUniqueConstraint,
//         });
//     };
// }
