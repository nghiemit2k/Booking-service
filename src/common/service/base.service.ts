import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";


export class BaseService<CreateDto, UpdateDto> {
    constructor(
        protected databaseService: DatabaseService,
        protected readonly moduleName: string
    ){}

   async findMany() {
       const result= await this.databaseService[this.moduleName].findMany({
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            timezoneCode: true,
            emailVerified: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            // Exclude the password field
            password: false,
        },
        });
        return result;
    }

    create(data: CreateDto) {
        return this.databaseService[this.moduleName].create({ data });
    }

    // async findByEmail(email: string) {
    //     const result = await this.databaseService[this.moduleName].findUnique({
    //         where: { email },
    //         select: { id: true, email: true },
    //     });
    //     return result;
    // }
    //TODO
    //findById=> result, null
    //findOrFailById=> resolve, 404
    //updateOrFailById=> 404
    //deleteOrFailById=> 404
    //findWithPagination=>
}