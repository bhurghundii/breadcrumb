import generateHeaders from "../../common/generateHeaders.tsx";
import {Auth} from "aws-amplify";

export default async function deleteBigBlock(blockId : string) {

  const user = await Auth.currentAuthenticatedUser();

  const headers = await generateHeaders();

  var requestOptions = {
    method: "DELETE",
    headers: headers,
    redirect: "follow",
  };

  try {
    console.log("Sit tight - deleting your pics on the mother-ship")
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
