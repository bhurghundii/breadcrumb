import json
import boto3
import base64

from botocore.exceptions import NoCredentialsError

s3_client = boto3.client('s3')

# /bigblock/{userId}/{pageId}
def lambda_handler(event, context):

    # Define the S3 bucket name and key prefix
    bucket_name = 'drawlbigblocks'
    key_prefix = event['pathParameters']['userId']
    id_to_find = event['pathParameters']['blockId']

    image_key = f"{key_prefix}/{id_to_find}.jpg"  # Adjust the file extension as needed

    try:
        # Get the uploaded image data from the Lambda event
        image_data = event['body']

        image = image_data

        # Generate a unique filename or use the original image filename
        # You may want to implement a more robust method for generating unique names

        # Upload the image to S3
        s3_client.put_object(Bucket=bucket_name, Key=image_key, Body=image, ContentType='image/jpeg')

        response = {
            "statusCode": 200,
            "body": json.dumps("Image uploaded successfully to S3.")
        }

    except NoCredentialsError:
        response = {
            "statusCode": 500,
            "body": json.dumps("No AWS credentials found.")
        }

    return response