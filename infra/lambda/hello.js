exports.handler = async function(event) {
  console.log(`request: ${JSON.stringify(event, undefined, 2)}`)
  const path = event.path ?? event.rawPath.replace(new RegExp(`^/${event.requestContext.stage}/`))
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: `Hello, CDK! You've hit ${path}\n`,
  }
}
