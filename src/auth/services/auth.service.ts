import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { ConfigServer } from "../../config/config";
import { UserEntity } from "../../entities/user.entity";
import { UserService } from "../../services/user.service";
import { PayloadToken } from "../../interface/auth.interface";

export class AuthService extends ConfigServer {

    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly jwtInstance = jwt
    ) {
        super();
    }

    public async validateUser(user_name: string, password: string): Promise<UserEntity | null> {

        const userByEmail = await this.userService.findUserByEmail(user_name)
        const userByUsername = await this.userService.findByUsername(user_name)

        if (userByEmail) {
            const isMach = await bcrypt.compare(password, userByEmail.password);
            isMach && userByEmail;
        }

        if (userByUsername) {
            const isMatch = await bcrypt.compare(password, userByUsername.password);
            if (isMatch) {
                return userByUsername;
            }
        }

        return null;
    }

    sing(payload: jwt.JwtPayload, secret: any) {
        //return this.jwtInstance.sing(payload, secret);
        return this.jwtInstance.sign(payload, secret, { expiresIn: "1h" });
    }

    public async generateJwt(user: UserEntity): Promise<{ accessToken: string; user: UserEntity }> {

        const userConsult = await this.userService.findUserWithRole(user.id, user.role);

        const payload: PayloadToken = {
            role: userConsult!.role,
            userData: userConsult!.id
        }

        if (userConsult) {
            user.password = 'Not permission';
        }

        return {
            accessToken: this.sing(payload, this.getEnvironment("JWT_SECRET")),
            user
        }
    }
}