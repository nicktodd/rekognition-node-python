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

   
    // let myLabels = null;
    // rekognition.detectLabels(params, function (err, data) {
    //     if (err) console.log(err, err.stack);
    //     else { 
    //         console.log(data);
    //         myLabels = data;
    //     }
    // });

    // rekognition.detectLabels(params).promise()
    //         .then(data => console.log(data))
    //         .catch(err => console.log(err));

    
async function goAndDoSomeRekognition() {
    try {
        // label detection
        let data = await rekognition.detectLabels(params).promise();
        console.log(data);
        // facial recognition
        let compareFacesResult = await rekognition.compareFaces(paramsForFacialRecognition).promise();
        console.log(compareFacesResult);
    }
    catch(ex) {
        console.log("Rekognition didn't work" + ex);
    }
}

goAndDoSomeRekognition();
    
    