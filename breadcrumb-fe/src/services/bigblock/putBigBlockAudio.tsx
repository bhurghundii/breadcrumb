import generateHeaders from "../../common/generateHeaders.tsx";
import {Auth} from "aws-amplify";

export default async function putBigBlockAudio(blockId : string, rawAudio : any) {

  const user = await Auth.currentAuthenticatedUser();

  const headers = await generateHeaders();

  var requestOptions = {
    method: 'PUT',
    headers: headers,
    body: rawAudio,
    redirect: 'follow'
  };

  try {
    console.log("Sit tight - sending your audio to the mother-ship")
    const response = await fetch(
      "API_URLbigblock/" +  user.attributes.sub  + "/" + blockId + "/mp3",
      //@ts-ignore
      requestOptions
    );

    return await response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
