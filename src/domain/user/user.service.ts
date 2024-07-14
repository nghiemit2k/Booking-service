import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma,User } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import bcrypt from 'bcrypt'
import { BaseService } from "src/common/service/base.service";


@Injectable()
export class UserService extends BaseService< Prisma.UserCreateInput,Prisma.UserUpdateInput> {
    constructor( databaseService: DatabaseService) {
        super(databaseService,'user')
    }
    // findMany() {
    //     return this.databaseService.user.findMany();
    // }
    async register(data: Prisma.UserCreateInput) {
        const hashedPassword = await this.hashPassword(data.password);
        console.log("🚀 ~ UserService ~ register ~ hashedPassword:", hashedPassword)
        
        const userData ={
            email: data.email,
            password:  hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            timezoneCode: data.timezoneCode

        };
        return this.databaseService.user.create({data: userData});
    }
        
    async hashPassword(password: string) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    async findOneOrFailEmail(email: string) {
        const user  = await this.databaseService.user.findUnique({where: {email}});
        if(!user) {
            throw new NotFoundException('User not found');;
        }
        return user;
    }
   
    comparePassword(password: string, hashPassword: string){
        return bcrypt.compare(password, hashPassword);
    }


    // async findByEmail(email: string) {
    //     return this.databaseService.user.findUnique({
    //         where: { email },
    //         select: { id: true, email: true },
    //     });
    // }

  
}