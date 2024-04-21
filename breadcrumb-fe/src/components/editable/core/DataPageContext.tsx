//@ts-nocheck

import PageContext from "./PageContext";
import KeyValueStore from "./KeyValueStore";
import getBlocksByPage from "../../../services/blocks/getBlocksByPage.tsx";
import generateBlock from "../../../common/generateBlock.tsx";
import { useEffect, useState } from "react";
import hashCode from "../../../common/hashcode";
import getBlocksByTag from "../../../services/blocks/getBlocksByTag.tsx";

export default function DataPageContext({
  pageId, userId,
  isTag,
    tag
}: {
  pageId: string;
  userId: string;
  isTag : boolean;
  tag?: string
}) {

  const [pageKeyValueStore, setPageKeyValueStore] = useState(
    new KeyValueStore<number, string>()
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    const fetchBlocksForPage = async () => {
      var keyValueStore = new KeyValueStore<number, string>();

      const dataBlocks = isTag ? (await getBlocksByTag(pageId)) : (await getBlocksByPage(pageId))

      if (dataBlocks) {
        //@ts-ignore
        for (var data of dataBlocks) {
          const json1 = generateBlock(data.blockType, data.blockValue, data.id, data.tag, data.pageId);
          const index = hashCode(data.id);
          keyValueStore.set(index, json1);
        }
        setPageKeyValueStore(keyValueStore);
        setIsLoaded(true);
      }
    };

     fetchBlocksForPage();
  }, []);

  return (
    <div>

      {isLoaded ? (
        <PageContext
          prevkeyValueStore={pageKeyValueStore}
          pageId={pageId}
          userId={userId}
          isTag={isTag}
          tag={tag}
        />
      ) : null}
    </div>
  );
}
