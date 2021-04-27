import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './User.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly user: Model<User>) { }

  public findOrCreateUser = async (user: User) => {
    const userInDB = await this.user.findOne({ clientId: user.clientId })
    if (!userInDB) {
      await this.user.create({ clientId: user.clientId, name: user.name, isOnline: true })
      return user;
    }
    return userInDB
  }

  public updateName = (clientId:string, name:string) => (this.user.findOneAndUpdate(
    { clientId: clientId },
    { $set: { name: name } },
    { new: true, useFindAndModify: false }))
}
