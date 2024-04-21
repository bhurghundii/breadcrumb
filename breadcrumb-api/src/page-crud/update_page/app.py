import json
import boto3

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    """Body expected:
    {
        "pageLayout": [],
    }
    """
    print(event)

    pageTableName = 'PageTable'
    pageTable = dynamodb.Table(pageTableName)

    if not event["body"] or event["body"] == "":
        return {"statusCode": 400, "headers": {}, "body": "Bad Request"}

    action: dict[str, str] = json.loads(event["body"])

    search_params = {
        "id": event["pathParameters"]["id"],
        "userId": event["pathParameters"]["userId"],
    }

    try:
        db_response = pageTable.update_item(
            Key=search_params,
            UpdateExpression="set pageLayout=:l",
            ExpressionAttributeValues={
                ":l": action["pageLayout"],
            },
            ConditionExpression="attribute_exists(id) and attribute_exists(userId)",
            ReturnValues="ALL_NEW",
        )
        print(db_response)

        return {
            "statusCode": 200,
            "headers": {},
            "body": json.dumps(db_response["Attributes"]),
        }

    except Exception as e:
        print(e)
        return {"statusCode": 400, "headers": {}, "body": "Bad Request"}
