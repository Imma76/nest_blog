import {
  Body,
  Controller,
  HttpException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';
import { CreateUserDTO, LogInUserDTO } from 'src/dto/user.dto';
import { UsersService } from 'src/user/services/users/users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userDTO: CreateUserDTO) {
    const salt = genSaltSync(10);

    const hash = hashSync(userDTO.password, salt);
    userDTO.password = hash;
    const newUser = await this.userService.createUser(userDTO);
    return {
      status: true,
      message: 'User created successfully',
      data: newUser,
    };
  }
  @Post('login')
  @UsePipes(new ValidationPipe())
  async logIn(@Body() logInDTO: LogInUserDTO) {
    const user = await this.userService.logInUser(logInDTO);
    if (!user) {
      return {
        status: false,
        message: 'User not found',
      };
    }
    const check = compareSync(logInDTO.password, user.password);
    console.log(check);
    if (!check) {
      throw new HttpException('Invalid credentials', 400);
    }
    delete user.password;
    return user;
  }
}
