import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, LogInUserDTO } from 'src/dto/user.dto';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userService: Model<User>) { }

    async createUser(userDTO: CreateUserDTO) {
        const newUser = await this.userService.create(userDTO);
        return newUser;
    }

    async logInUser(logInUserDTO: LogInUserDTO) {
        const user = await this.userService.findOne({ email: logInUserDTO.email });
        if (!user) {
            throw new HttpException('Invalid credentials', 400);
        }
        return user;
    }
}
