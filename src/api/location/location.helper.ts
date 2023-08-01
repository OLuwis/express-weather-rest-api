export class LocationHelper {
    format(token: string) {
        const splitToken = token.split(" ");
        const trimToken = splitToken[1].trim();
        return trimToken;
    };
};