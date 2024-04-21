export default class SerializableBlockObject {
    type: string;
    title: string;
    id: string;
    tag: string;
    pageId: string
  
    constructor(type: string, title: string, id: string, tag : string, pageId: string) {
      this.type = type;
      this.title = title;
      this.id = id;
      this.tag = tag;
      this.pageId = pageId;
    }
  
    toJSON(): Record<string, any> {
      return {
        type: this.type,
        title: this.title,
        id: this.id,
        tag: this.tag,
        pageId : this.pageId
      };
    }
  }
