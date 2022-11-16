import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Infra from '../lib/infra-stack';

test('DynamoDB Table billing mode is on-demand', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Infra.InfraStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html
  template.hasResourceProperties('AWS::ApiGatewayV2::Api', {
    ProtocolType: 'HTTP',
  })

  // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html
  template.hasResourceProperties('AWS::DynamoDB::Table', {
    BillingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
  });
});
