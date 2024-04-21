import generateHeaders from "../../common/generateHeaders.tsx";

export default async function updateBlock(pageId: string, blockId: string, blockValue: string, blockType: string, tagHash: string, tag: string) {


  blockValue = blockValue.replace(/(?:\r\n|\r|\n)/g, '\\n');

  const headers = await generateHeaders()

  const body = '{\n        "blockValue": "' + blockValue.trim() + '",\n        "blockType": "' + blockType + '",\n        "tagId": "' + tagHash + '", \n        "tag": "' + tag.trim() + '" \n}';

  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: body,
    redirect: "follow",
  };

  //@ts-ignore
  fetch("API_URLblocks/" + blockId + "/" + pageId, requestOptions)
    .then(() => console.log("Presto! Your block has been updated"))
    .catch((error) => console.log("error", error));
}
