import {useState} from "react";
import {v4 as uuidv4} from "uuid";

import KeyValueStore from "./KeyValueStore";
import PageContent from "./PageContent.tsx";
import generateBlock from "../../../common/generateBlock.tsx";
import createBlock from "../../../services/blocks/createBlock.tsx";
import deleteBlock from "../../../services/blocks/deleteBlock.tsx";
import hashCode from "../../../common/hashcode";
import updateBlock from "../../../services/blocks/updateBlock.tsx";
import AppBar from "./AppBar.tsx";
import generatePageId from "../../../common/generatePageId.tsx";
import getCurrentDate from "../../../common/getCurrentDate.tsx";

type PageContextType = {
  prevkeyValueStore: KeyValueStore<number, string>;
  pageId: string;
  userId: string;
  isTag: boolean;
  tag?: string
}

export default function PageContext(pageContextType: PageContextType) {

  const [keyValueStore, setKeyValueStore] = useState(pageContextType.prevkeyValueStore);

  function updateLocalStateWithCreatedValue (serializedJSON: string, blockId: string) {
    const index = hashCode(blockId);

    const newKeyValueStore = cloneKeystore();
    newKeyValueStore.set(index, serializedJSON);
    setKeyValueStore(newKeyValueStore);
  }

  function updateLocalStateWithUpdatedBlock (blockId: string, blockCode: string, blockType: string, tag: string, pageID : string) {
    const index = hashCode(blockId);
    const updatedBlock = generateBlock(blockType, blockCode, blockId, tag, pageID);
    const newKeyValueStore = cloneKeystore();

    newKeyValueStore.set(index, updatedBlock);
    setKeyValueStore(newKeyValueStore);
  }

  function updateLocalStateWithDeletedBlock (blockId: string) {
    const index = hashCode(blockId);

    const newKeyValueStore = cloneKeystore();
    newKeyValueStore.delete(index);
    setKeyValueStore(newKeyValueStore);
  }

  function cloneKeystore() {
    const newKeyValueStore = new KeyValueStore<number, string>();

    keyValueStore.entries().forEach(([key, value]) => {
      newKeyValueStore.set(key, value);
    });

    return newKeyValueStore
  }

  function createNewBlock(blockType: string){
    const uuid = uuidv4();
    const pageId = generatePageId(pageContextType.userId, getCurrentDate())

    var tag: string | undefined = ""
    if (pageContextType.isTag){
      tag = pageContextType.tag
    }

    createBlock(pageId.toString(), "", blockType, uuid, pageContextType.userId, tag ? tag : "", generatePageId(pageContextType.userId, "0").toString()).then(() => {
      updateLocalStateWithCreatedValue(generateBlock(blockType, "", uuid, tag ? tag : "", pageId.toString()), uuid);
    })
  }

  function deleteBlockWithId (blockId: string, pageId: string) {

    deleteBlock(pageId.toString(), blockId).then(() => {
      updateLocalStateWithDeletedBlock(blockId);
    })

  }

  function updateBlockWithId (blockId: string, code: string, type: string, isValid: boolean, tag: string, pageId: string) {

    tag = tag.toLowerCase().trim();
    const tagHash = generatePageId(pageContextType.userId, tag)

    if (isValid) {
      updateBlock(pageId.toString(), blockId, code, type, tagHash.toString(), tag).then(() => {
        updateLocalStateWithUpdatedBlock(blockId, code, type, tag, pageId)
      })
    }
  }

  return (
      <div style={{ padding: "2%"}}>

        <div style={{paddingTop: "5%"}}>
          <AppBar />
        </div>

        <hr style={{borderTop: '1px solid whitesmoke'}}/>
        <PageContent
          keyValueStore={keyValueStore}
          createBlock={createNewBlock}
          deleteThisBlock={deleteBlockWithId}
          updateThisBlock={updateBlockWithId}
        />
    </div>
  );
}
