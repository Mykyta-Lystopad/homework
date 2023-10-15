pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Check Commit Message') {
            steps {
                script {
                    def commitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    if (!commitMessage.startsWith("KEY-")) {
                        error "Commit must be starting with Jira ticket (example, KEY-123)"
                    }
                }
            }
        }

        stage('Lint Dockerfiles') {
            steps {
                script {
                    sh 'hadolint ./Dockerfile'
                }
            }
        }
    }
}
