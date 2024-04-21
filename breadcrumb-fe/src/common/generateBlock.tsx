import SerializableBlockObject from "../components/editable/core/SerializableObject";

export default function generateBlock(type: string, value: string, id: string, tag: string, pageId: string) {
    const jsonObject = new SerializableBlockObject(type, value, id, tag, pageId);
    return JSON.stringify(jsonObject);
  }
