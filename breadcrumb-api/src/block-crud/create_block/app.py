import json
import uuid
import datetime
import boto3

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    """Body expected:
    {
        "page_id": "...",
        "blockValue": "...",
        "blockType": "..."
    }
    """
    print(event)

    blocksTableName = 'BlocksTable'
    blockTable = dynamodb.Table(blocksTableName)

    if not event["body"] or event["body"] == "":
        return {"statusCode": 400, "headers": {}, "body": "Bad request"}

    action: dict[str, str] = json.loads(event["body"])

    params = {
        "id": action["id"],
        "pageId": action["page_id"],
        "blockValue": action["blockValue"],
        "blockType": action["blockType"],
        "timestamp": str(datetime.datetime.now())
    }

    try:
        db_response = blockTable.put_item(Item=params)
        print(db_response)

        return {"statusCode": 201, "headers": {}, "body": json.dumps(params)}
    except Exception as e:
        print(e)
        return {"statusCode": 500, "headers": {}, "body": "Internal Server Error"}
