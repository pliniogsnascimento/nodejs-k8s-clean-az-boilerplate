#!/usr/bin/env groovy
pipeline {
    agent any
    

    environment {
        IMAGE_NAME="pliniogsnascimento/productsapi:development-0.0.${BUILD_NUMBER}"
        KUBERNETES_CONTAINER_NAME="productsmicroservice"
        KUBERNETES_DEPLOYMENT="productsdeployment"
        KUBERNETES_NAMESPACE="undermarket-services"
    }

    stages {
        stage('Build Docker') {
            steps{
                script {
                    echo '============ Inicio stage Build Docker ============'
                    def customImage = docker.build("${IMAGE_NAME}")
                    customImage.push()
                    echo '============ Fim stage Build Docker ============'
                }
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