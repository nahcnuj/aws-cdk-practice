import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import * as Lambda from 'aws-cdk-lib/aws-lambda'
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda'
import { HitCounter } from '../lib/hitcounter'

test('A DynamoDB table should be created with on-demand billing mode', () => {
  const stack = new cdk.Stack()
  // WHEN
  new HitCounter(stack, 'MyTestHitCounter', {
    downstream: new Lambda.Function(stack, 'MyTestLambda', {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset('lambda'),
      handler: 'hello',
    })
  })
  // THEN

  const template = Template.fromStack(stack)

  // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html
  template.resourceCountIs('AWS::DynamoDB::Table', 1)
  template.hasResourceProperties('AWS::DynamoDB::Table', {
    BillingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
  });
})
