import { AccessToken } from "./accessToken";
import { RefreshToken } from "./refreshToken";

export class RefreshTokenResponse{
    accessToken:AccessToken = new AccessToken();
    refreshToken:RefreshToken = new RefreshToken();
}