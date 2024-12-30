import { Injectable, Res } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async users() {
        return this.prisma.user.findMany();
    }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    // Registration
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        data.password = await bcrypt.hash(data.password, 10)

        return this.prisma.user.create({
            data,
        });
    }
    // Login
    async login(data: Prisma.UserWhereUniqueInput, res: Response): Promise<any> {
        const userData = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (userData) {
            const result = await bcrypt.compare(data.password as string, userData.password)
            if (result) {
                delete userData.password
                return res.status(200).json(userData)
            }
        }
        return res.status(401).json({ message: "Wrong email or password" })
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}
