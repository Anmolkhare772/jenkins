pipeline {
    agent any

    environment {
        IMAGE_NAME = 'anmol122/anmol-mern-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Anmolkhare772/jenkins.git'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER -t $IMAGE_NAME:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    sh '''
                        set +x
                        echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USER" --password-stdin
                        docker push "$IMAGE_NAME:$BUILD_NUMBER"
                        docker push "$IMAGE_NAME:latest"
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                sh '''
                    docker compose pull app
                    docker compose up -d --no-build
                    docker compose ps
                '''
            }
        }
    }

    post {
        success {
            echo 'Build, Docker Hub push, and deployment completed!'
        }
        failure {
            echo 'Pipeline failed. Check the stage logs.'
        }
    }
}