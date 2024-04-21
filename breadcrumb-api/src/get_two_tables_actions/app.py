import os
import json
import boto3

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):

    userId = event["pathParameters"]["userId"]
    pageId = event["pathParameters"]["pageId"]
    
    try:
        table_name_1 = 'PageTable'
        table_name_2 = 'BlocksTable'

        # Get layout details item into DynamoDBTable1
        table_1 = dynamodb.Table(table_name_1)
        layout_details = table_1.get_item(Key={"id": pageId, "userId": userId})
        
        print(layout_details)

        # Get items in that page into DynamoDBTable2
        # table_2 = dynamodb.Table(table_name_2)

        # batch_key = { 
        #     table_2.pageId : {
        #         'Keys' : [{'pageId': pageId for pageLayout in pageLayoutList}]
        #     }
        # }

        # layout_values = table_2.batch_get_items(RequestItems=batch_key)
        
        # print(layout_values)


        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Data retrieved into both tables successfully'
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e)
            })
        }