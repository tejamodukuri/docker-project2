pipeline {
    
      stage("App Build started"){
      echo 'App build started..'
      }
    
git credentialsId: 'fe839c8e-3f44-4a7e-b8c4-97f8ac3fc0e7', url: 'https://github.com/tejamodukuri/onborading'
     
    agent { label "build" }
    environment {
         def ip = sh returnStdout: true, script: 'curl -s http://169.254.169.254/latest/meta-data/public-ipv4'
    }
    
    stage('Docker Build') {
     def app = docker.build "onboard"
    }
    stage("Tag & Push image"){
withDockerRegistry(credentialsId: '085f3b9e-6cb0-4961-9aae-391eba385e8a', url: 'https://hub.docker.com/') {
   sh 'docker tag onboard tejamodukuri/onboard'
          sh 'docker push tejamodukuri/onboard'

              }
    }

    stages {
        stage("checkout"){
            steps {
                checkout scm
            }
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


