# Practice of AWS CDK

[AWS CDK Workshop](https://cdkworkshop.com/)

## Environment

```console
$ aws --version
aws-cli/2.8.12 Python/3.9.11 Linux/5.10.102.1-microsoft-standard-WSL2 exe/x86_64.ubuntu.22 prompt/off

# configure or login a profile for a sandbox account with AdministratorAccess by SSO
$ export AWS_PROFILE=sandbox-admin
$ export AWS_DEFAULT_REGION=ap-northeast-1
$ aws configure sso --no-browser
$ # aws sso login --no-browser

$ node -v
v16.18.1
$ npm -v
8.19.2

$ npm i -g aws-cdk
$ cdk --version
2.50.0 (build 4c11af6)
```

## New Project

```
$ mkdir infra && cd $_
$ cdk init sample-app --language typescript

$ cdk synth | tee template.yaml
$ cdk bootstrap
$ cdk deploy

✨  Synthesis time: 17.76s

InfraStack: building assets...

[0%] start: Building cd4b56c3e32c00a459b58f1e9147e9c45c747eb9c4abd3b695745a93307bcb59:current_account-current_region
[100%] success: Built cd4b56c3e32c00a459b58f1e9147e9c45c747eb9c4abd3b695745a93307bcb59:current_account-current_region

InfraStack: assets built

This deployment will make potentially sensitive changes according to your current security approval level (--require-approval broadening).
Please confirm you intend to make the following modifications:

IAM Statement Changes
┌───┬───────────────────┬────────┬─────────────────┬───────────────────────────┬───────────────────────────────────────────────────┐
│   │ Resource          │ Effect │ Action          │ Principal                 │ Condition                                         │
├───┼───────────────────┼────────┼─────────────────┼───────────────────────────┼───────────────────────────────────────────────────┤
│ + │ ${InfraQueue.Arn} │ Allow  │ sqs:SendMessage │ Service:sns.amazonaws.com │ "ArnEquals": {                                    │
│   │                   │        │                 │                           │   "aws:SourceArn": "${InfraTopic}"                │
│   │                   │        │                 │                           │ }                                                 │
└───┴───────────────────┴────────┴─────────────────┴───────────────────────────┴───────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Do you wish to deploy these changes (y/n)? y

InfraStack: deploying...
[0%] start: Publishing cd4b56c3e32c00a459b58f1e9147e9c45c747eb9c4abd3b695745a93307bcb59:current_account-current_region
[100%] success: Published cd4b56c3e32c00a459b58f1e9147e9c45c747eb9c4abd3b695745a93307bcb59:current_account-current_region
InfraStack: creating CloudFormation changeset...

 ✅  InfraStack

✨  Deployment time: 96.72s

Stack ARN:
arn:aws:cloudformation:ap-northeast-1:994159167629:stack/InfraStack/a30b1d10-6471-11ed-8e7c-0acdbcbbb597

✨  Total time: 114.48s


$
```

## Hello, CDK!

Remove all resources from [lib/infra-stack.ts](lib/infra-stack.ts).

```
$ cdk synth | tee template.yaml
$ cdk diff
Stack InfraStack
IAM Statement Changes
┌───┬───────────────────────────┬────────┬─────────────────┬───────────────────────────┬───────────────────────────────────────────────────────────┐
│   │ Resource                  │ Effect │ Action          │ Principal                 │ Condition                                                 │
├───┼───────────────────────────┼────────┼─────────────────┼───────────────────────────┼───────────────────────────────────────────────────────────┤
│ - │ ${InfraQueue969BB8E7.Arn} │ Allow  │ sqs:SendMessage │ Service:sns.amazonaws.com │ "ArnEquals": {                                            │
│   │                           │        │                 │                           │   "aws:SourceArn": "${InfraTopic44770A4E}"                │
│   │                           │        │                 │                           │ }                                                         │
└───┴───────────────────────────┴────────┴─────────────────┴───────────────────────────┴───────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Resources
[-] AWS::SQS::Queue InfraQueue969BB8E7 destroy
[-] AWS::SQS::QueuePolicy InfraQueuePolicyE88EDBDB destroy
[-] AWS::SNS::Subscription InfraQueueInfraStackInfraTopic7A7FAD83018E7200 destroy
[-] AWS::SNS::Topic InfraTopic44770A4E destroy
$ cdk deploy

✨  Synthesis time: 9.23s

InfraStack: building assets...

[0%] start: Building 4d28fc616ca4951ff1ca46227abd6bf04a99273ad62afb2fa8b1d40534b31a36:current_account-current_region
[100%] success: Built 4d28fc616ca4951ff1ca46227abd6bf04a99273ad62afb2fa8b1d40534b31a36:current_account-current_region

InfraStack: assets built

InfraStack: deploying...
[0%] start: Publishing 4d28fc616ca4951ff1ca46227abd6bf04a99273ad62afb2fa8b1d40534b31a36:current_account-current_region
[100%] success: Published 4d28fc616ca4951ff1ca46227abd6bf04a99273ad62afb2fa8b1d40534b31a36:current_account-current_region
InfraStack: creating CloudFormation changeset...

 ✅  InfraStack

✨  Deployment time: 95.96s

Stack ARN:
arn:aws:cloudformation:ap-northeast-1:994159167629:stack/InfraStack/a30b1d10-6471-11ed-8e7c-0acdbcbbb597

✨  Total time: 105.19s
```

Create `lambda/hello.js` (in `infra` directory)

```
$ cdk synth | tee template.yaml
$ cdk diff
$ cdk deploy
```

Create and execute a `test` Amazon API Gateway AWS Proxy event on Console:

```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "text/plain",
    "body": "Hello, CDK! You've hit /path/to/resource\n"
  }
}
```

log output:

```
START RequestId: 24b6acf0-b4ec-40b4-8da3-485706448852 Version: $LATEST
2022-11-15T00:16:49.536Z	24b6acf0-b4ec-40b4-8da3-485706448852	INFO	request: {
  "body": "eyJ0ZXN0IjoiYm9keSJ9",
  "resource": "/{proxy+}",
  "path": "/path/to/resource",
  "httpMethod": "POST",
  "isBase64Encoded": true,
  "queryStringParameters": {
    "foo": "bar"
  },
  "multiValueQueryStringParameters": {
    "foo": [
      "bar"
    ]
  },
  "pathParameters": {
    "proxy": "/path/to/resource"
  },
  "stageVariables": {
    "baz": "qux"
  },
  "headers": {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, sdch",
    "Accept-Language": "en-US,en;q=0.8",
    "Cache-Control": "max-age=0",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-Country": "US",
    "Host": "1234567890.execute-api.us-east-1.amazonaws.com",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Custom User Agent String",
    "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==",
    "X-Forwarded-For": "127.0.0.1, 127.0.0.2",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https"
  },
  "multiValueHeaders": {
    "Accept": [
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    ],
    "Accept-Encoding": [
      "gzip, deflate, sdch"
    ],
    "Accept-Language": [
      "en-US,en;q=0.8"
    ],
    "Cache-Control": [
      "max-age=0"
    ],
    "CloudFront-Forwarded-Proto": [
      "https"
    ],
    "CloudFront-Is-Desktop-Viewer": [
      "true"
    ],
    "CloudFront-Is-Mobile-Viewer": [
      "false"
    ],
    "CloudFront-Is-SmartTV-Viewer": [
      "false"
    ],
    "CloudFront-Is-Tablet-Viewer": [
      "false"
    ],
    "CloudFront-Viewer-Country": [
      "US"
    ],
    "Host": [
      "0123456789.execute-api.us-east-1.amazonaws.com"
    ],
    "Upgrade-Insecure-Requests": [
      "1"
    ],
    "User-Agent": [
      "Custom User Agent String"
    ],
    "Via": [
      "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)"
    ],
    "X-Amz-Cf-Id": [
      "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA=="
    ],
    "X-Forwarded-For": [
      "127.0.0.1, 127.0.0.2"
    ],
    "X-Forwarded-Port": [
      "443"
    ],
    "X-Forwarded-Proto": [
      "https"
    ]
  },
  "requestContext": {
    "accountId": "123456789012",
    "resourceId": "123456",
    "stage": "prod",
    "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
    "requestTime": "09/Apr/2015:12:34:56 +0000",
    "requestTimeEpoch": 1428582896000,
    "identity": {
      "cognitoIdentityPoolId": null,
      "accountId": null,
      "cognitoIdentityId": null,
      "caller": null,
      "accessKey": null,
      "sourceIp": "127.0.0.1",
      "cognitoAuthenticationType": null,
      "cognitoAuthenticationProvider": null,
      "userArn": null,
      "userAgent": "Custom User Agent String",
      "user": null
    },
    "path": "/prod/path/to/resource",
    "resourcePath": "/{proxy+}",
    "httpMethod": "POST",
    "apiId": "1234567890",
    "protocol": "HTTP/1.1"
  }
}
END RequestId: 24b6acf0-b4ec-40b4-8da3-485706448852
REPORT RequestId: 24b6acf0-b4ec-40b4-8da3-485706448852	Duration: 8.78 ms	Billed Duration: 9 ms	Memory Size: 128 MB	Max Memory Used: 57 MB	Init Duration: 142.93 ms
```

Add an API Gateway of HTTP API endpoint to call HelloLambda.
Unlike Workshop, use HTTP API instead of REST API.
HTTP API constructor is experimental at the time of writing and is required installing additional packages, `@aws-cdk/aws-apigatewayv2-alpha` and `@aws-cdk/aws-apigatewayv2-integration-alpha`.

```
$ curl -s 'https://m6p81aq0m0.execute-api.ap-northeast-1.amazonaws.com'
Hello, CDK! You've hit /
$ curl -s 'https://m6p81aq0m0.execute-api.ap-northeast-1.amazonaws.com/hello'
Hello, CDK! You've hit /hello
```

## Writing Constructs

Create lib/hitcounter.ts and lambda/hitcounter.js, and modify lib/infra-stack.ts.

```console
$ curl -si 'https://m6p81aq0m0.execute-api.ap-northeast-1.amazonaws.com/'
HTTP/2 500
date: Tue, 15 Nov 2022 16:43:53 GMT
content-type: application/json
content-length: 35
apigw-requestid: bps3bj7atjMEP3w=

{"message":"Internal Server Error"}
```

From CloudWatch Logs:

```
2022-11-15T16:43:53.032Z	46d324ec-613f-4d45-8622-551f985d0158	ERROR	Invoke Error
{
    "errorType": "AccessDeniedException",
    "errorMessage": "User: arn:aws:sts::994159167629:assumed-role/InfraStack-HelloHitCounterHitCounterHandlerService-R2LN05SZLLRA/InfraStack-HelloHitCounterHitCounterHandlerDAEA7B3-PNDo0RR8Idee is not authorized to perform: dynamodb:UpdateItem on resource: arn:aws:dynamodb:ap-northeast-1:994159167629:table/InfraStack-HelloHitCounterHits7AAEBF80-79TNQBBTLGIK because no identity-based policy allows the dynamodb:UpdateItem action",
    "code": "AccessDeniedException",
    "message": "User: arn:aws:sts::994159167629:assumed-role/InfraStack-HelloHitCounterHitCounterHandlerService-R2LN05SZLLRA/InfraStack-HelloHitCounterHitCounterHandlerDAEA7B3-PNDo0RR8Idee is not authorized to perform: dynamodb:UpdateItem on resource: arn:aws:dynamodb:ap-northeast-1:994159167629:table/InfraStack-HelloHitCounterHits7AAEBF80-79TNQBBTLGIK because no identity-based policy allows the dynamodb:UpdateItem action",
    "time": "2022-11-15T16:43:53.031Z",
    "requestId": "EUD777G1VMCLC4VVSVR39B93LFVV4KQNSO5AEMVJF66Q9ASUAAJG",
    "statusCode": 400,
    "retryable": false,
    "retryDelay": 45.796417170201934,
    "stack": [
        "AccessDeniedException: User: arn:aws:sts::994159167629:assumed-role/InfraStack-HelloHitCounterHitCounterHandlerService-R2LN05SZLLRA/InfraStack-HelloHitCounterHitCounterHandlerDAEA7B3-PNDo0RR8Idee is not authorized to perform: dynamodb:UpdateItem on resource: arn:aws:dynamodb:ap-northeast-1:994159167629:table/InfraStack-HelloHitCounterHits7AAEBF80-79TNQBBTLGIK because no identity-based policy allows the dynamodb:UpdateItem action",
        "    at Request.extractError (/var/runtime/node_modules/aws-sdk/lib/protocol/json.js:52:27)",
        "    at Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:106:20)",
        "    at Request.emit (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:78:10)",
        "    at Request.emit (/var/runtime/node_modules/aws-sdk/lib/request.js:686:14)",
        "    at Request.transition (/var/runtime/node_modules/aws-sdk/lib/request.js:22:10)",
        "    at AcceptorStateMachine.runTo (/var/runtime/node_modules/aws-sdk/lib/state_machine.js:14:12)",
        "    at /var/runtime/node_modules/aws-sdk/lib/state_machine.js:26:10",
        "    at Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:38:9)",
        "    at Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:688:12)",
        "    at Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:116:18)"
    ]
}
```

Grant permission to read/write Hits table for HitCounterHandler, but another error occurs.

```
2022-11-15T16:54:14.843Z	27df3969-0f9a-4383-b820-d5fe876c8166	ERROR	Invoke Error
{
    "errorType": "AccessDeniedException",
    "errorMessage": "User: arn:aws:sts::994159167629:assumed-role/InfraStack-HelloHitCounterHitCounterHandlerService-R2LN05SZLLRA/InfraStack-HelloHitCounterHitCounterHandlerDAEA7B3-PNDo0RR8Idee is not authorized to perform: lambda:InvokeFunction on resource: arn:aws:lambda:ap-northeast-1:994159167629:function:InfraStack-HelloHandler2E4FBA4D-AN4GSEyXhCqn because no identity-based policy allows the lambda:InvokeFunction action",
    "code": "AccessDeniedException",
    "message": "User: arn:aws:sts::994159167629:assumed-role/InfraStack-HelloHitCounterHitCounterHandlerService-R2LN05SZLLRA/InfraStack-HelloHitCounterHitCounterHandlerDAEA7B3-PNDo0RR8Idee is not authorized to perform: lambda:InvokeFunction on resource: arn:aws:lambda:ap-northeast-1:994159167629:function:InfraStack-HelloHandler2E4FBA4D-AN4GSEyXhCqn because no identity-based policy allows the lambda:InvokeFunction action",
    "time": "2022-11-15T16:54:14.843Z",
    "requestId": "e3095261-23a2-4d1b-92c2-4d7dd8e564dd",
    "statusCode": 403,
    "retryable": false,
    "retryDelay": 78.00721461811986,
    "stack": [
        "AccessDeniedException: User: arn:aws:sts::994159167629:assumed-role/InfraStack-HelloHitCounterHitCounterHandlerService-R2LN05SZLLRA/InfraStack-HelloHitCounterHitCounterHandlerDAEA7B3-PNDo0RR8Idee is not authorized to perform: lambda:InvokeFunction on resource: arn:aws:lambda:ap-northeast-1:994159167629:function:InfraStack-HelloHandler2E4FBA4D-AN4GSEyXhCqn because no identity-based policy allows the lambda:InvokeFunction action",
        "    at Object.extractError (/var/runtime/node_modules/aws-sdk/lib/protocol/json.js:52:27)",
        "    at Request.extractError (/var/runtime/node_modules/aws-sdk/lib/protocol/rest_json.js:49:8)",
        "    at Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:106:20)",
        "    at Request.emit (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:78:10)",
        "    at Request.emit (/var/runtime/node_modules/aws-sdk/lib/request.js:686:14)",
        "    at Request.transition (/var/runtime/node_modules/aws-sdk/lib/request.js:22:10)",
        "    at AcceptorStateMachine.runTo (/var/runtime/node_modules/aws-sdk/lib/state_machine.js:14:12)",
        "    at /var/runtime/node_modules/aws-sdk/lib/state_machine.js:26:10",
        "    at Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:38:9)",
        "    at Request.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/request.js:688:12)"
    ]
}
```

Grant HitCounterHandler permission to invoke the downstream function (HelloHandler).

```console
$ curl -si 'https://m6p81aq0m0.execute-api.ap-northeast-1.amazonaws.com/'
HTTP/2 200 
date: Tue, 15 Nov 2022 17:05:21 GMT
content-type: text/plain
content-length: 27
apigw-requestid: bpwAajQXNjMEPRg=

Good Morning! You've hit /
```

## Using construct libraries

```console
$ npm install --save cdk-dynamo-table-viewer
```
