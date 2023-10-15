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
                label 'docker'
            }
            steps {
                script {
                    // Check the Dockerfile path relative to your workspace
                    def dockerfilePath = "Dockerfile"
        
                    // Make sure the Dockerfile exists
                    if (fileExists(dockerfilePath)) {
                        // Use hadolint Docker image to lint the Dockerfile
                        sh "docker run --rm -i hadolint/hadolint:latest-debian < ${dockerfilePath}"
                    } else {
                        error "Dockerfile not found at path: ${dockerfilePath}"
                    }
                }
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
