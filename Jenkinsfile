#!/usr/bin/env groovy
pipeline {
    agent any
    stages {
        stage('Publish Docker') {
            steps {
                echo '============ Inicio stage Build ============'
                // script {
                //     try {
                //         sh "docker-compose down"
                //     }
                //     catch(exc) {
                //         echo "Imagem e container ainda não criados"
                //     }
                //     def buildCommand = "docker-compose up --build -d"
                //     sh "${buildCommand}"

                //     sleep(3);
                //     echo "API Publicada com sucesso"
                // }
                echo "Build finalizado com sucesso" 
                echo '============ Fim stage Build ============'
            }
        }
    }
}