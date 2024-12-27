import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getUsers() {
        return ['dkfjs']
    }
    getUser(id: string) {
        return { id }
    }
    createUser() {
        return {
            inserted: true,
            message: `New user created`
        }
    }
    updateUser(id: string) {
        return {
            updated: true,
            message: `User ${id} have been updated`
        }
    }
    deleteUser(id: string) {
        return {
            deleteCount: 1,
            message: `User ${id} have been deleted`
        }
    }
}
