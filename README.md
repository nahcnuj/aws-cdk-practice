# Practice of AWS CDK

[AWS CDK Workshop](https://cdkworkshop.com/)

## Environment

```console
$ aws --version
aws-cli/2.8.12 Python/3.9.11 Linux/5.10.102.1-microsoft-standard-WSL2 exe/x86_64.ubuntu.22 prompt/off

# configure or login a profile for a sandbox account with AdministratorAccess by SSO
$ export AWS_PROFILE=sandbox-admin
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
```
