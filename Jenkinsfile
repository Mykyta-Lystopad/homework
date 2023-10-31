pipeline {
    agent { label 'docker' }
    // abort previouse job
    // if (env.CHANGE_ID != null) {
    // properties([disableConcurrentBuilds(abortPrevious: true)])
    // }
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
                    if (!(commitMessage.length() >= 10 && commitMessage.startsWith("EPM-"))) {
                        error "Commit message must be at least 10 characters long and start with 'EPM-'."
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

            // post {
            //     failure {
            //         script {
            //             currentBuild.result = 'FAILURE'
            //         }
            //     }
            //     always {
            //         script {
            //             if (currentBuild.resultIsBetterOrEqualTo('FAILURE')) {
            //                 error "Build failed. Merging not allowed."

            //             }
            //         }
            //     }
            // }

            post {
                success{
                    setBuildStatus("Build succeeded", "SUCCESS");
                }

                failure {
                    setBuildStatus("Build failed", "FAILURE");
                } 

                // Sending notification to gmail
                always {
                    emailext to: "niktoring77@gmail.com",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: """
                    Logs from Jenkins pipeline:
                    ${currentBuild.rawBuild.getLog(100)}
                    """,
                    attachLog: true
                }
            } 
        }
    }
}
