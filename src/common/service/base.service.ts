import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";


export class BaseService<CreateDto, UpdateDto> {
    constructor(
        protected databaseService: DatabaseService,
        protected readonly moduleName: string
    ){}

   async findMany() {
       const result= await this.databaseService[this.moduleName].findMany();
        return result;
    }
    findById(id: number) {
        return this.databaseService[this.moduleName].findUnique({
            where: { id }
        });
    }
    create(data: CreateDto) {
        return this.databaseService[this.moduleName].create({ data });
    }
    updateById(id: number, data: UpdateDto) {
        return this.databaseService[this.moduleName].update({
            where: { id },
            data
        });
    }
    deleteById(id: number) {
        return this.databaseService[this.moduleName].delete({
            where: { id },
        });
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