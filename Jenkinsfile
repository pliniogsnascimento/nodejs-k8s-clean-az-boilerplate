#!/usr/bin/env groovy
pipeline {
    agent { 
                node{
                    label 'linux-agent2e0a10'
                }
            }
    

    environment {
        IMAGE_NAME="pliniogsnascimento/productsapi:development-0.0.${BUILD_NUMBER}"
        DOCKER_HUB_USERNAME="pliniogsnascimento"
        DOCKER_HUB_PASSWORD="TCCFATEC2018"
        KUBERNETES_CONTAINER_NAME="productsmicroservice"
        KUBERNETES_DEPLOYMENT="productsdeployment"
        KUBERNETES_NAMESPACE="undermarket-services"
    }

    stages {
        stage('Build Docker') {
            
            steps{
                echo '============ Inicio stage Build  Docker ============'

                sh "docker build -t ${IMAGE_NAME} ."
                sh "docker login --username ${DOCKER_HUB_USERNAME} --password ${DOCKER_HUB_PASSWORD}"
                sh "docker push ${IMAGE_NAME}"

                echo '============ Fim stage Build Docker ============'
            }
        }
        stage('Publish Docker Locally') {
            steps {
                echo '============ Inicio stage Build ============'
                script {
                    try {
                        sh "docker-compose down" 
                    }
                    catch(exc) {
                        echo "Imagem e container ainda n�o criados"
                    }
                    def buildCommand = "docker-compose up --build -d"
                    // sh "${buildCommand}" 

                    sleep(3);
                    echo "API Publicada com sucesso"
                }
                echo "Build finalizado com sucesso"
                echo '============ Fim stage Build ============'
            }
        }

        stage('Publish to Kubernetes') {
            steps {
                echo '============ Inicio stage de Publish to Kubernetes ============'
                // sleep(30);
                sh "kubectl -n ${KUBERNETES_NAMESPACE} set image deployment/${KUBERNETES_DEPLOYMENT} ${KUBERNETES_CONTAINER_NAME}=${IMAGE_NAME}"

                echo '============ Inicio stage de Publish to Kubernetes ============'
            }
        }
    }
} 