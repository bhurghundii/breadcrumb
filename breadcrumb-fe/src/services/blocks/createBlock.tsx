import generateHeaders from "../../common/generateHeaders.tsx";

export default async function createBlock(
  pageId: string,
  value: string,
  type: string,
  id: string,
  userId: string,
  tag: string,
  tagId: string
) {

  const headers = await generateHeaders();

  //TODO: ADD TAG TO CREATE
  const body =
    '{\n        "page_id": "' +
    pageId +
    '",\n        "blockValue": "' +
    value +
    '",\n        "blockType": "' +
    type +
      '",\n        "tag": "' +
      tag +
    '",\n        "tagId": "' +
      tagId +
    '",\n        "id": "' +
      id +
    '",\n        "userId": "' +
      userId +
    '" \n' + '}';

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: body,
    redirect: "follow",
  };


  fetch(
    "API_URLblocks",
    //@ts-ignore
    requestOptions
  )
    .then(() => console.log("Created a block successfully"))
    .catch((error) => console.log("error", error));
}
