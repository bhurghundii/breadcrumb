import json
import boto3
import base64

s3_client = boto3.client('s3')

# /bigblock/{userId}/{pageId}
def lambda_handler(event, context):
    try:
        # Define the S3 bucket name and key prefix
        bucket_name = 'drawlbigblocks'

        # Extract the ID from the request
        key_prefix = event['pathParameters']['userId']
        id_to_find = event['pathParameters']['blockId']

        # Construct the S3 object key based on the ID
        image_key = f"{key_prefix}/{id_to_find}.jpg"  # Adjust the file extension as needed

        # Try to get the image from S3
        try:
            response = s3_client.delete_object(Bucket=bucket_name, Key=image_key)
        except s3_client.exceptions.NoSuchKey:
            return {
                'statusCode': 404,
                'body': json.dumps('Image not found')
            }

        # Prepare the response
        return {
            "statusCode": 200,
            "body": json.dumps(f"File deleted successfully from S3.")
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }