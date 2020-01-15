#gitlab_ci_example

This repo contain an example pipelin for a Hellow World NodeJs App.

# What are the file in this repo

* The Docker file with the Docker Ignore file
* The Git Pipeline yaml.
* A markdown file with explanation on how to link a K8S cluster with the pipeline.

# Structure of the Pipeline

- test : Will run npm test
- publish_registry : Publish a first version of the dockerfile to the repo
- publish_production : Publish a production version
- publish_preprod
- publish_staging
- deploy_production : Deploy the image on the Production Namespace
- deploy_preprod
- deploy_staging

#Next steps

Next step is to optimise the docker file , and add STAS/DAST test
