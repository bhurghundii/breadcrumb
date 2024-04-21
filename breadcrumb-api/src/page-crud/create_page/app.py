import datetime
import json
import uuid
import boto3

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    """Body expected:
    {
        "pageId": "UUID from Cognito",
        "userId": "UUID from Cognito",
        "pageLayout": [],
    }
    """
    print(event)

    pageTableName = 'PageTable'
    pageTable = dynamodb.Table(pageTableName)

    if not event["body"] or event["body"] == "":
        return {"statusCode": 400, "headers": {}, "body": "Bad request"}

    action: dict[str, str] = json.loads(event["body"])

    params = {
        "id": action["pageId"],
        "userId": action["userId"],
        "pageLayout": [],
        "timestamp": str(datetime.datetime.now()),
    }

    try:
        db_response = pageTable.put_item(Item=params)
        print(db_response)

        return {"statusCode": 201, "headers": {}, "body": json.dumps(params)}
    except Exception as e:
        print(e)
        return {"statusCode": 500, "headers": {}, "body": "Internal Server Error"}
