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
        stage ("lint dockerfile") {
            agent {
                docker {
                    image 'hadolint/hadolint:latest-debian'
                    //image 'ghcr.io/hadolint/hadolint:latest-debian'
                }
            }
        steps {
            // sh 'hadolint dockerfiles/*
            sh 'hadolint ./Dockerfile'
            }
        }
        post {
          failure {
              script {
                  currentBuild.result = 'FAILURE'
              }
          }
        }
        post {
            always {
                script {
                    if (currentBuild.resultIsBetterOrEqualTo('FAILURE')) {
                        echo "Блокуємо мерж гілки feature в основну гілку"
                        // Add your code to block merges from feature to main here
                    }
                }
            }
        }
    }
}
