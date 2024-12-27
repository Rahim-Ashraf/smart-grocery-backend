import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUser(id)
    }

    @Post()
    createUser() {
        return this.usersService.createUser()
    }

    @Patch(':id')
    updateUser(@Param('id') id: string) {
        return this.usersService.updateUser(id)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id)
    }
}
