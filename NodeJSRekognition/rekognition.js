const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const rekognition = new AWS.Rekognition();

let params = {
        Image: {
            S3Object: {
                Bucket: "facesusconygrecom",
                Name: "sarah.jpg"
            }
        },
        MinConfidence: 80
        
    };

    let paramsForFacialRecognition =  {
        SourceImage:{
        S3Object: {
            Bucket: "facesusconygrecom",
            Name: "sarah.jpg",
        }
        },
        TargetImage:{
        S3Object: {
            Bucket: "facesusconygrecom",
            Name: "family.jpg",
        }
    },
    SimilarityThreshold:90,
    }
   

async function goAndDoSomeRekognition() {
    try {
        // label detection
        let data = await rekognition.detectLabels(params).promise();
        
        // print all of the labels
        for (item in data.Labels) {
            console.log(data.Labels[item].Name + ": " + data.Labels[item].Confidence);
        }
        
        data.Labels.forEach(
            (item) => console.log(item.Name + ": " + item.Confidence));


        
        // facial recognition and print the confidence
        let compareFacesResult = await rekognition.compareFaces(paramsForFacialRecognition).promise();
        console.log("Here is our matching confidence");
        console.log(compareFacesResult.FaceMatches[0].Similarity);
    }
    catch(ex) {
        console.log("Rekognition didn't work" + ex);
    }
}

goAndDoSomeRekognition();
    
    