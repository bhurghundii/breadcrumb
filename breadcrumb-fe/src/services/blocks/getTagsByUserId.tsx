import generateHeaders from "../../common/generateHeaders.tsx";

interface TagInterface {
  tag: string
}

export default async function getTagsByUserId(userId : string) {

  const headers = await generateHeaders();

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    console.log("Sit tight - grabbing your tags")

    const response = await fetch(
      "API_URLtags/" + userId,
      //@ts-ignore
      requestOptions
    );
    if (response.status == 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: TagInterface = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
