pipeline {
    agent { label 'docker' }

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
                        error "Commit must start with a Jira ticket (e.g., KEY-123)"
                    }
                }
            }
        }

        stage("Lint Dockerfile") {
            agent {
                docker {
                    image 'hadolint/hadolint:latest-debian'
                }
            }
            steps {
                sh 'hadolint ./Dockerfile'
            }
            post {
                failure {
                    script {
                        currentBuild.result = 'FAILURE'
                    }
                }
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
}
