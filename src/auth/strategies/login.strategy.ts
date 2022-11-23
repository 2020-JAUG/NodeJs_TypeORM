import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { UserEntity } from "../../entities/user.entity";
import { AuthService } from "../services/auth.service";
import { PassportUse } from "../utils/passport.use";

const authService: AuthService = new AuthService();

export class LoginStrategy {

    async validate(user_name: string, password: string, done: any): Promise<UserEntity> {

        const user = await authService.validateUser(user_name, password);

        if (!user) {
            return done(null, false, { message: "Unauthorizate", code: 401 });
        }

        return done(null, user);
    }

    get use() {

        return PassportUse<LocalStrategy, Object, VerifyFunction>(
            "login", LocalStrategy,
            { //Nombre de la estrategia la clase que extiende, configuracion para la extrategy y callback de validate user.
                usernameField: "user_name",
                passwordField: "password"
            }, this.validate
        )
    }
}