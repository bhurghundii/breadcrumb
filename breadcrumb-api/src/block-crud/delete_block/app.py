import boto3

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    print(event)

    blocksTableName = 'BlocksTable'
    blockTable = dynamodb.Table(blocksTableName)

    id: str = event["pathParameters"]["id"]
    page_id: str = event["pathParameters"]["pageId"]

    try:
        db_response = blockTable.delete_item(
            Key={"id": id, "pageId": page_id},
            ConditionExpression="attribute_exists(id) and attribute_exists(pageId)",
        )
        print(db_response)

        return {
            "statusCode": 200,
            "body": "Deleted with success",
        }
    except Exception as e:
        print(e)
        return {
            "statusCode": 400,
            "body": "Bad Request",
        }
