import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getUsers() {
        return this.usersService.users()
    }

    // @Get(':id')
    // getUser(@Param('id') id: string) {
    //     return this.usersService.user(id)
    // }

    @Post()
    async createUser(
        @Body() userData: { name: string; email: string },
    ) {
        return this.usersService.createUser(userData)
    }

    // @Patch(':id')
    // updateUser(@Param('id') id: string) {
    //     return this.usersService.updateUser(id)
    // }

    // @Delete(':id')
    // deleteUser(@Param('id') id: string) {
    //     return this.usersService.deleteUser(id)
    // }
}
