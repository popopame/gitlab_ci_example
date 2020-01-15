#### This file will contain all the steps I took to configure Kubernetes

### 2. Kubernetes Cluster

Below I explain how I deploy the container on  the cluster.
First I create a secret on the kubernetes cluster that contain the private repo creditential.
Then I explain how I create the pod on the Cluster at the end of the pipeline.
And to finish I explain how thing can go in production.

Since I do not have a working EKS or GKS cluster on hand (for obvious monetary reason) , I deployed on this pipeline using a kubectl script , that was ran on a container , on the git-runner.

But in a production context , gitlab will be installed on the cluster (whether as a deployment or a simple pod)

#### 2.1 Creating a Secret

To pull an image from a private docker Repo , you need to register a secret in the kubernetes cluster.

We will create a secret containing all the ID needed to authentificate to the docker registry of gitlab.

```bash
kubectl create secret docker-registry regcred --docker-server=<server> --docker-username=<user>--docker-password=<token>
```

The secret is created in kubernetes and now can be used in deployment.

To launch a pod from a host with a configured kubectl , you can use this yaml and this command
command: ```bash kubectl create -f epsor.yaml```

The yaml to launch a Pod using the image:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: private-reg #Name of the pod
spec:
  containers:
  - name: private-container #Name of container
    image: registry.gitlab.com/popopame/epsor_test #address of the pod
  imagePullSecrets:
  - name: regcred #secret containing the docker creditential
```
#### 2.2 Deploying the pod using kubectl

All the pipeline was executed on a Gitlab-runner configured in the same network as my cluster.

So to start , I execute a before_script command to create a deployment.

```bash kubectl create --server ${KUBERNETES_ENDPOINT} --token $CI_GITLAB_TOKEN} -f ${CI_YAML_DEPLOYMENT} --namespace ${CI_COMMIT_REF_NAME}```

The variables refer to:
* **$KUBERNETES_ENDPOINT** : Point to the LoadBalancer of my cluster.
* **$CI_GITLAB_TOKEN** : Token used for authentification for the gitlab services
* **$CI_YAML_DEPLOYMENT** : Yaml of the Deployment

Here is the yaml that we will pass as a variable:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: epsor_deployment
  labels:
    app: epsor
spec:
  replicas: 3
  selector:
    matchLabels:
      app: epsor
  template:
    metadata:
      labels:
        app: epsor
    spec:
      containers:
      - name: epsor-pod
        image: registry.gitlab.com/popopame/epsor_test
        imagePullSecrets:
        - name: regcred
        ports:
        - containerPort: 3000
```

Once the deployment is created (it is indempotent , if it already exist it won't trigger an error)
We execute this line:
```bash  kubectl --namespace ${CI_COMMIT_REF_NAME} set image deployment.v1.apps/epsor-pod epsor-pod=${CI_REGISTRY_IMAGE}:${CI_BUILD_REF}```

This will update the image version of the deployment.

#### 2.3 Deploying in production

In production here what I would change:
* Use a managed cluster EKS or GKS , to deploy a Gitlab-Plane , and easily manage deployment/Monitoring
* Use Helm charts , to better manager the Deployments/services
* Create STAS and DAST tests
