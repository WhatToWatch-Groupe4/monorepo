import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import fetch from 'node-fetch';

interface KeycloakJwtIssuer {
  realm: string;
  public_key: string;
  'token-service': string;
  'account-service': string;
  'tokens-not-before': number;
}

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      useFactory: async () => {
        const issuer: KeycloakJwtIssuer = await fetch('https://accounts.agravelot.eu/auth/realms/wtw').then(res =>
          res.json(),
        );

        return {
          publicKey: issuer.public_key,
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
