import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getUsers() {
        return this.usersService.users()
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.user({ id: +id })
    }

    @Post()
    async createUser(
        @Body() userData: { name: string; email: string, password: string },
    ) {
        return this.usersService.createUser(userData)
    }
    @Post('auth')
    async login(
        @Body() userData: { email: string, password: string }, @Res() res: Response
    ) {
        return this.usersService.login(userData, res)
    }

    @Patch(':id')
    updateUser(
        @Param('id') id: string,
        @Body() userData: { name?: string; email?: string }
    ) {
        return this.usersService.updateUser({ where: { id: +id }, data: userData })
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser({ id: +id })
    }
}
