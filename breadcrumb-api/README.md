# breadcrumb-api

## What's this?
An application that I'm using to learn about AWS and software engineering in general.

## How To's

Create docker network:

```bash
docker network create lambda-local
```

Create the dynamodb container:

```bash
docker run -p 8000:8000 -d --rm --network lambda-local --name dynamodb -v ./.docker/dynamodb:/data/ amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath /data
```

Run the local SAM template API:

```bash
sam local start-api --docker-network lambda-local --parameter-overrides AWSENV=AWS_SAM_LOCAL
```

Run the unit tests:

```bash
python3 -m unittest discover tests/unit/ -bv
```

Validate the SAM template:

```bash
sam validate
```

Build the SAM stack:

```bash
sam build
```

Deploy the SAM stack:

```bash
sam deploy --guided
```

Delete the SAM stack:

```bash
sam delete --stack-name todo-list-api
```


# TO DOs 

Rn, we just append the Lists - there has to be a better way of doing this 
