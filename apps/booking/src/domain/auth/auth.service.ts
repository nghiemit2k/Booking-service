import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "../user/user.service"
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private userService: UserService,    private jwtService: JwtService){}
    async signIn(email:string,password:string) {
        const foundUser = await this.userService.findOneOrFailEmail(email);

        const isMatched = await this.userService.comparePassword(
            password,
            foundUser.password
        )
        if(!isMatched) {
            throw new UnauthorizedException('Password mismatch');
        }
        const payload ={
            sub: foundUser.id ,
            email: foundUser.email
        }
        const jwt = await this.jwtService.signAsync(payload);
        return {
            jwt,
            payload
        }
    }

}