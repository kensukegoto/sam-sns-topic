var aws = require('aws-sdk');

var sns = new aws.SNS({
   apiVersion: '2010-03-31',
   region: 'ap-northeast-1'
});

exports.lambdaHandler = async function(event, context) {

  var params = {
    Message: 'hello,world', /* required */
    TopicArn: 'arn:aws:sns:ap-northeast-1:395218667042:MyTopic'
    // TopicArn: 'arn:aws:sns:ap-northeast-1:395218667042:MyTopic:6d2ddb61-f604-462d-8566-8835b3729812'
  };

  await sns.publish(params).promise().then(
    function(data) {
      console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
      console.log("MessageID is " + data.MessageId);
      console.log("ここまで来てる！");
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });

};