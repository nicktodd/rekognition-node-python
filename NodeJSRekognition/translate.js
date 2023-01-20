const aws = require("aws-sdk");
aws.config.update({
    region: 'us-east-1'
});


async function translatePolish() {
    const awsTranslate = new aws.Translate();
    let polishResult = null;
    const params = {
        SourceLanguageCode: 'en', // english language code
        TargetLanguageCode: 'pl', // german language code
        Text: "hello world"
      }
    try {
        polishResult = 
            await awsTranslate.translateText(params).promise();
    }
    catch (e) {
        console.log(e);
    }
    console.log(polishResult.TranslatedText);
}

translatePolish();