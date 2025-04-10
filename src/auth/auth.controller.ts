import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Users } from "src/entities/user.entity";
import { UserRegisterDto } from "src/dto/userRegister.dto";
import { ResponseEntity } from "src/utils/response.utils";
import { UserLoginDto } from "src/dto/userLogin.dto";

@Controller("/api/v1/nest/auth")
export class AuthController {
    constructor ( private readonly authService: AuthService ) {}

    @Post("/register-user")
    async registerUser(@Body() userRegisterDto: UserRegisterDto): Promise<ResponseEntity<Users>> {
        return new ResponseEntity(true, "User Created", await this.authService.registerUser(userRegisterDto));
    }

    @Post("/login-user")
    async loginUser(@Body() userLoginDto: UserLoginDto): Promise<ResponseEntity<String>> {
        return new ResponseEntity(true, "User Logged In", await this.authService.loginUser(userLoginDto));
    }

}