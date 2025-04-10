import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Users } from "src/entities/user.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { ResponseEntity } from "src/utils/response.utils";

@Controller("/api/v1/nest/user")
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get()
    getAllUsers () {
        return this.userService.getAllUsers();
    }

    @Get("/me")
    @UseGuards(AuthGuard)
    async getCurrentUser (@Request() user: any): Promise<ResponseEntity<Users>> {
        return new ResponseEntity(true, "Current User", await this.userService.getUserByEmail(user.email));
    }
}