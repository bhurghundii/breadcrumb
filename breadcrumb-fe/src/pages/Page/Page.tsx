import {useParams} from "react-router-dom";
import DataPageContext from "../../components/editable/core/DataPageContext.tsx";
import {withAuthenticator} from "@aws-amplify/ui-react";
import generatePageId from "../../common/generatePageId.tsx";

function Page({accountId}: { accountId: string }) {
    let {dateId} = useParams();
    let pageId = 0

    if (dateId && accountId) {
        pageId = generatePageId(accountId, dateId)
    }

    return (
        <div>
            <DataPageContext pageId={pageId.toString()} isTag={false} userId={accountId}/>
        </div>
    );
}

export default withAuthenticator(Page);

