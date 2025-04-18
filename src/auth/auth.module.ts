import { Module } from "@nestjs/common";
import { UserModule } from "src/users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {};