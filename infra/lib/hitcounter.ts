import * as DynamoDB from 'aws-cdk-lib/aws-dynamodb';
import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface HitCounterProps {
  downstream: Lambda.IFunction,
}

export class HitCounter extends Construct {
  // to be able to access from infra-stack
  public readonly handler: Lambda.Function

  constructor(scope: Construct, id: string, props: HitCounterProps) {
    super(scope, id)
    
    const table = new DynamoDB.Table(this, 'Hits', {
      partitionKey: {
        name: 'path',
        type: DynamoDB.AttributeType.STRING,
      }
    })

    this.handler = new Lambda.Function(this, 'HitCounterHandler', {
      runtime: Lambda.Runtime.NODEJS_16_X,
      code: Lambda.Code.fromAsset('lambda'),
      handler: 'hitcounter.handler',
      environment: {
        DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
        HITS_TABLE_NAME: table.tableName,
      },
    })

    table.grantReadWriteData(this.handler)
    props.downstream.grantInvoke(this.handler)
  }
}
