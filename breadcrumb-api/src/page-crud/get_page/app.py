import json
import boto3

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    print(event)
    
    page_id = event["pathParameters"]["id"]
    user_id = event["pathParameters"]["userId"]

    pageTableName = 'PageTable'
    pageTable = dynamodb.Table(pageTableName)

    try:
        action_details = pageTable.get_item(Key={"id": page_id, "userId": user_id})
        print(action_details)

        return {
            "statusCode": 200,
            "headers": {},
            "body": json.dumps(action_details["Item"]),
        }
    except Exception as e:
        print(e)
        return {
            "statusCode": 404,
            "headers": {},
            "body": "Not Found",
        }
