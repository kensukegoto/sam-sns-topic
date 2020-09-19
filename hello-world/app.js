const aws = require('aws-sdk');

const sns = new aws.SNS({
  apiVersion: '2010-03-31',
  region: 'ap-northeast-1'
});

exports.lambdaHandler = async function(event, context, callback) {

  const dataPosted = JSON.parse(event.body);
  const message = dataPosted.message || "none";

  const params = {
    Message: message,
    TopicArn: 'arn:aws:sns:ap-northeast-1:395218667042:MyTopic'
  };

  await sns.publish(params)
    .promise()
    .then((data) => {

      callback(null,{
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          messageID : data.MessageId,
          message : params.Message
         })
      })

    }).catch(err => {
      console.error(err);
      callback(null,{
        statusCode: 500,
        body: JSON.stringify({
          success: false
        })
      })
    });

};