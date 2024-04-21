import hashCode from "./hashcode";

export default function generatePageId(AWSCognitoID : string, date: string) {

    return hashCode(AWSCognitoID) * hashCode(date)
}