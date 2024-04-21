import { BlockInterface } from "../../interface/BlockInterface.tsx";
import generateHeaders from "../../common/generateHeaders.tsx";

export default async function getBlocksByPage(pageId : string) {

  const headers = await generateHeaders();

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    console.log("Sit tight - grabbing your stuff")
    const response = await fetch(
      "API_URLblocks/" + pageId,
      //@ts-ignore
      requestOptions
    );
    if (response.status == 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: BlockInterface = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
