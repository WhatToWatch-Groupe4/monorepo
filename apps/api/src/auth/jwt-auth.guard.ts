import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const splittedAuthorization = request.headers['authorization'].split(' ');

    if (splittedAuthorization[0] !== 'Bearer') {
      return false;
    }

    const token = splittedAuthorization[1];

    console.log({ token });

    const client = new JwksClient({
      jwksUri: 'https://accounts.agravelot.eu/auth/realms/wtw/protocol/openid-connect/certs',
    });

    function getKey(header, callback) {
      client.getSigningKey(header.kid, function (err, key) {
        console.log({ err, key });

        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      });
    }

    try {
      verify(token, getKey, function (err, decoded) {
        console.log({ err, decoded }); // bar
      });
    } catch (e) {
      console.error(e);

      throw e;
    }

    console.log('verif');

    return true;
  }
}
