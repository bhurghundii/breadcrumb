import json

import boto3

dynamodb = boto3.resource('dynamodb')


# /blocks/{id}/{pageId}
def lambda_handler(event, context):
    """Body expected:
    {
        "id": str(uuid.uuid4()),
        "page_id": action["page_id"],
        "blockValue": action["blockValue"],
        "type": action["type"],
    }
    """
    print(event)

    blocksTableName = 'BlocksTable'
    blockTable = dynamodb.Table(blocksTableName)

    if not event["body"] or event["body"] == "":
        return {"statusCode": 400, "headers": {}, "body": "Bad Request"}

    action: dict[str, str] = json.loads(event["body"])

    search_params = {
        "id": event["pathParameters"]["id"],
        "pageId": event["pathParameters"]["pageId"],
    }

    try:
        db_response = blockTable.update_item(
            Key=search_params,
            UpdateExpression="set blockValue=:v, blockType=:t",
            ExpressionAttributeValues={
                ":v": action["blockValue"],
                ":t": action["blockType"],
            },
            ConditionExpression="attribute_exists(id) and attribute_exists(pageId)",
            ReturnValues="ALL_NEW",
        )
        print(db_response)

        return {
            "statusCode": 200,
            "headers": {}
        }

    except Exception as e:
        print(e)
        return {"statusCode": 400, "headers": {}, "body": "Bad Request"}
