import * as apigwv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { HitCounter } from './hitcounter';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const helloLambda = new Lambda.Function(this, 'HelloHandler', {
      runtime: Lambda.Runtime.NODEJS_16_X,
      code: Lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler',
    })

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: helloLambda,
    })

    new apigwv2.HttpApi(this, 'HelloHttpApi', {
      defaultIntegration: new HttpLambdaIntegration('HelloLambdaIntegration', helloWithCounter.handler),
    })
  }
}
