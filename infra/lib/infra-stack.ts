import * as apigwv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { TableViewer } from 'cdk-dynamo-table-viewer';
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
    new LogGroup(this, 'HelloHandlerLogGroup', {
      logGroupName: '/aws/lambda/InfraStack-HelloHandler2E4FBA4D-AN4GSEyXhCqn',
      retention: RetentionDays.INFINITE,
      removalPolicy: RemovalPolicy.DESTROY,
    })

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: helloLambda,
    })

    new apigwv2.HttpApi(this, 'HelloHttpApi', {
      defaultIntegration: new HttpLambdaIntegration('HelloLambdaIntegration', helloWithCounter.handler),
    })

    new TableViewer(this, 'HitsTableViewer', {
      title: 'Hello Hits',
      table: helloWithCounter.table,
      sortBy: '-hits',
    })
  }
}
