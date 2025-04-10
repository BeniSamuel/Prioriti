import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { Users } from "src/entities/user.entity";
import { UserRegisterDto } from "src/dto/userRegister.dto";
import { UserLoginDto } from "src/dto/userLogin.dto";
import { bcrypt } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor (private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async registerUser (userRegisterDto: UserRegisterDto): Promise<Users> {
        const user = await this.userService.getUserByEmail(userRegisterDto.email);
        if (user) { throw new UnauthorizedException("User Already Exist!!"); }
        // userRegisterDto.password = await
        return this.userService.createUser(userRegisterDto);
    }

    async loginUser (userLoginDto: UserLoginDto): Promise<String> {
        const user = await this.userService.getUserByEmail(userLoginDto.email);
        if (!user) { throw new UnauthorizedException("User Doesn't Exist!!"); }

        if (user.password !== userLoginDto.password) { throw new UnauthorizedException("Invalid Credentials"); }
        return this.jwtService.sign(user.email);
    }
}