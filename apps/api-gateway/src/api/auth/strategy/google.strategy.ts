import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-google-oauth20';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
    };
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const authProfile = {
      id: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value,
      provider: profile.provider,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return authProfile;
  }
}
