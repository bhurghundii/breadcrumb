import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    print(event)
    page_id = event["pathParameters"]["tagId"]

    blocksTableName = 'BlocksTable'
    blockTable = dynamodb.Table(blocksTableName)

    try:
        action_details = blockTable.query(KeyConditionExpression=Key('pageId').eq(page_id))
        print(action_details)

        return {
            "statusCode": 200,
            "headers": {},
            "body": json.dumps(action_details["Items"]),
        }
    except Exception as e:
        print(e)
        return {
            "statusCode": 404,
            "headers": {},
            "body": "Not Found",
        }
