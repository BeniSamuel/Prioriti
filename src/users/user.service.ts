import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRegisterDto } from "src/dto/userRegister.dto";
import { Users } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor ( @InjectRepository(Users) private readonly usersRepository: Repository<Users> ) {}

    createUser (userRegisterDto: UserRegisterDto): Promise<Users> {
        const newUser = this.usersRepository.create(userRegisterDto); // Converting into the db object
        return this.usersRepository.save(newUser);
    }

    getAllUsers (): Promise<Users[]> {
        return this.usersRepository.find();
    }

    getUserByEmail (email: string): Promise<Users> {
        return this.usersRepository.findOne({ where: {email}});
    }
}