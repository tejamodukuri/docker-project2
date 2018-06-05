node{
   
   stage("App Build started"){
      echo 'App build started..'
git credentialsId: 'fe839c8e-3f44-4a7e-b8c4-97f8ac3fc0e7', url: 'https://github.com/tejamodukuri/onboarding'
      }
   
   stage('Docker Build') {
     def app = docker.build "onboard"
    }
   
   stage("Tag & Push image"){
withDockerRegistry(credentialsId: '085f3b9e-6cb0-4961-9aae-391eba385e8a', url: 'https://hub.docker.com/') {
   sh 'docker tag pythondocker tejamodukuri/board'
          sh 'docker push tejamodukuri/board'

              }
    }
   
    stage('App deployed to Docker') {
     echo 'App deployed to Hub..'
    }

}
   


