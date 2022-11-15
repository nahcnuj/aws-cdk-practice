const { DynamoDB, Lambda } = require('aws-sdk')

exports.handler = async function(event) {
  console.log(`request: ${JSON.stringify(event, undefined, 2)}`)

  const dynamo = new DynamoDB()
  const lambda = new Lambda()

  const { HITS_TABLE_NAME: TableName, DOWNSTREAM_FUNCTION_NAME: FunctionName } = process.env

  // count up hitting count for the path
  await dynamo.updateItem({
    TableName,
    Key: { path: { S: event.rawPath }},
    UpdateExpression: 'ADD hits :incr',
    ExpressionAttributeValues: { ':incr': { N: '1' }},
  }).promise()

  // call downstream function
  const resp = await lambda.invoke({
    FunctionName,
    Payload: JSON.stringify(event),
  }).promise()

  console.log(`downstream response:\n${JSON.stringify(resp, undefined, 2)}`)

  return JSON.parse(resp.Payload)
}
