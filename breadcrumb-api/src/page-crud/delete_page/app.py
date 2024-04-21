from dynamo import dynamo_table


def lambda_handler(event, context):
    print(event)

    page_id: str = event["pathParameters"]["id"]
    user_id: str = event["pathParameters"]["userId"]

    try:
        db_response = dynamo_table().delete_item(
            Key={"id": page_id, "created_dt": user_id},
            ConditionExpression="attribute_exists(id) and attribute_exists(created_dt)",
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
