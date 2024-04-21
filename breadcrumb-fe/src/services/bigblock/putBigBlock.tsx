import generateHeaders from "../../common/generateHeaders.tsx";
import {Auth} from "aws-amplify";
import Resizer from "react-image-file-resizer";

export default async function putBigBlock(blockId : string, rawFile : any) {

  const rawImage = await resizeFile(rawFile)

  const user = await Auth.currentAuthenticatedUser();

  const headers = await generateHeaders();

  var requestOptions = {
    method: 'PUT',
    headers: headers,
    body: rawImage,
    redirect: 'follow'
  };

  try {
    console.log("Sit tight - sending your pics to the mother-ship")

    const response = await fetch(
      "API_URLbigblock/" +  user.attributes.sub  + "/" + blockId + "/jpg",
      //@ts-ignore
      requestOptions
    );

    return await response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const resizeFile = (file : any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
          file,
          500,
          500,
          "JPEG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "base64"
      );
    });
