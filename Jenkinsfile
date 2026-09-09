pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Anmolkhare772/jenkins.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building HTML website...'
                sh 'ls -la'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing HTML website...'
                sh 'test -f index.html'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying website to Apache...'

                sh '''
                    sudo rsync -av --delete ./ /var/www/html/
                    sudo systemctl restart apache2
                '''
            }
        }
    }

    post {
        success {
            echo 'Website deployed successfully!'
        }

        failure {
            echo 'Website deployment failed!'
        }
    }
}
