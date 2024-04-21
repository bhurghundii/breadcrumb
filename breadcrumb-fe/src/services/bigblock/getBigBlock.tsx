import generateHeaders from "../../common/generateHeaders.tsx";
import {Auth} from "aws-amplify";

export default async function getBigBlock(blockId : string) {

  const user = await Auth.currentAuthenticatedUser();

  const headers = await generateHeaders();

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    console.log("Sit tight - grabbing your pics")

    return await fetch(
        "API_URLbigblock/" + user.attributes.sub + "/" + blockId + "/jpg",
        //@ts-ignore
        requestOptions
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
