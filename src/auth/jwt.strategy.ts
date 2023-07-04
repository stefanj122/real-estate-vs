import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayloadT } from 'src/types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: JWTPayloadT) {
    return {
      id: payload.id,
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      role: payload.role,
    };
  }
}
