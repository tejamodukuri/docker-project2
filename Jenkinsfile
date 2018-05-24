pipeline {
    agent { label "build" }
    environment {
         def ip = sh returnStdout: true, script: 'curl -s http://169.254.169.254/latest/meta-data/public-ipv4'
    }

    stages {
        stage("checkout"){
            steps {
                checkout scm
            }
        }

        stage("static code analysis"){
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh '/opt/sonar/bin/sonar-scanner -Dsonar.projectKey=ZervOnboarding -Dsonar.sources=api'
                }
            }
        }

        stage("build docker image"){
            steps {
                sh "docker-compose build"
            }
        }


        stage("env cleanup"){
            steps {
                sh "docker image prune -f"
            }
        }

        stage("Launch service"){
            steps {
                sh "docker-compose stop"
                sh "docker-compose up -d"
            }
        }

        stage("Launch Info"){
            steps {
                echo "service running on ${ip}"
            }
        }

    }
}

