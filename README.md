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
v18.12.1
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
