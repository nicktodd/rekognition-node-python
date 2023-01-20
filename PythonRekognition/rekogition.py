import boto3
rekognition = boto3.client("rekognition", "us-east-1")  

response = rekognition.detect_labels(
		Image={
			"S3Object": {
				"Bucket": "facesusconygrecom",
				"Name": "sarah.jpg",
			}
		},
		MaxLabels=10,
		MinConfidence=70,
	)

for label in response['Labels']:
    print ("{Name} - {Confidence}%".format(**label))


response = rekognition.compare_faces(
	    SourceImage={
			"S3Object": {
				"Bucket": "facesusconygrecom",
				"Name": "sarah.jpg",
			}
		},
		TargetImage={
			"S3Object": {
				"Bucket": "facesusconygrecom",
				"Name": "family.jpg",
			}
		},
	    SimilarityThreshold=90,
	)
for match in response["FaceMatches"]:
	print ("Target Face ({Confidence}%)".format(**match['Face']))

    