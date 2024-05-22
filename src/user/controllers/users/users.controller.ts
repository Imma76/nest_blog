import {
  Body,
  Controller,
  HttpException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, LogInUserDTO } from 'src/dto/user.dto';
import { UsersService } from 'src/user/services/users/users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userDTO: CreateUserDTO) {
    const saltOrRounds = 10;
    const password = userDTO.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
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
    const isMatch = await bcrypt.compare(logInDTO.password, user.password);
    // const check = compareSync(logInDTO.password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', 400);
    }
    delete user.password;
    return user;
  }
}
