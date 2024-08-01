import { Inject, Injectable } from '@nestjs/common';
import { ModelTokens } from '../tokens/model.tokens';
import { Mail } from '../schemas/interfaces/mail.interface';
import { Model } from 'mongoose';

@Injectable()
export class MailRepository {
  constructor(@Inject(ModelTokens.MAIL_MODEL) private readonly mailModel: Model<Mail>) {}

  async findMailById(_id: string) {
    return await this.mailModel.findOne({ _id });
  }
}
