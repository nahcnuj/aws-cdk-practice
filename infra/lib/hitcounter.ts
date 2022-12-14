import { RemovalPolicy } from 'aws-cdk-lib';
import * as DynamoDB from 'aws-cdk-lib/aws-dynamodb';
import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export interface HitCounterProps {
  downstream: Lambda.IFunction,
}

export class HitCounter extends Construct {
  // to be able to access from infra-stack
  public readonly handler: Lambda.Function

  public readonly table: DynamoDB.Table

  constructor(scope: Construct, id: string, props: HitCounterProps) {
    super(scope, id)
    
    const table = new DynamoDB.Table(this, 'Hits', {
      partitionKey: {
        name: 'path',
        type: DynamoDB.AttributeType.STRING,
      },
      billingMode: DynamoDB.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    })
    this.table = table

    this.handler = new Lambda.Function(this, 'HitCounterHandler', {
      runtime: Lambda.Runtime.NODEJS_16_X,
      code: Lambda.Code.fromAsset('lambda'),
      handler: 'hitcounter.handler',
      environment: {
        DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
        HITS_TABLE_NAME: table.tableName,
      },
    })
    new LogGroup(this, 'HitCounterHandlerLogGroup', {
      logGroupName: '/aws/lambda/InfraStack-HelloHitCounterHitCounterHandlerDAEA7B3-PNDo0RR8Idee',
      retention: RetentionDays.ONE_DAY,
      removalPolicy: RemovalPolicy.DESTROY,
    })

    table.grantReadWriteData(this.handler)
    props.downstream.grantInvoke(this.handler)
  }
}
