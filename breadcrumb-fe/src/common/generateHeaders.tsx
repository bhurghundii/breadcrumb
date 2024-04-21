import {Auth} from "aws-amplify";

export default async function generateHeaders() {
    const user = await Auth.currentAuthenticatedUser();

    const token = user.signInUserSession.idToken.jwtToken;

    const headers = new Headers();
    headers.append("Content-Type", "text/plain");
    headers.append("Authorization", token);

    return headers;
}
