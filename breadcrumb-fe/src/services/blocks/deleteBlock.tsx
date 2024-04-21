import generateHeaders from "../../common/generateHeaders.tsx";

export default async function deleteBlock(pageId : string, blockId : string ) {

  const headers = await generateHeaders();

  const requestOptions = {
    method: "DELETE",
    headers: headers,
    redirect: "follow",
  };

  fetch(
    //@ts-ignore
    "API_URLblocks/" + blockId + "/" + pageId, requestOptions
  )
    .then(() => console.log("Deleted a block successfully"))
    .catch((error) => console.log("error", error));
}
