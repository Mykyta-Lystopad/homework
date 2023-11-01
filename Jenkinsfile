// void setBuildStatus(String message, String state) {
//   step([
//       $class: "GitHubCommitStatusSetter",
//       reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/Mykyta-Lystopad/homework.git"],
//       contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
//       errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
//       statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
//   ]);
// }



pipeline {
    agent { label 'docker' }

    options {
      withCredentials([
        string(credentialsId: 'git-token-2', variable: 'TOKEN')
      ])
    }

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
                    // setBuildStatus("Build succeeded", "SUCCESS");
                    sh """
                        curl -L \
                            -X POST \
                            -H "Accept: application/vnd.github+json" \
                            -H "Authorization: Bearer ${TOKEN}" \
                            -H "X-GitHub-Api-Version: 2022-11-28" \
                            https://api.github.com/repos/Mykyta-Lystopad/homework/statuses/b7b8c6270097baf7f88e8fbf9a8247b29e92be4b \
                            -d '{"state":"success","target_url":"https://Mykyta-Lystopad/homework/build/status", \
                            "description":"The build:${currentBuild.currentResult}!","context":"continuous-integration/jenkins:${env.JOB_NAME}"}'
                    """
                }

                failure {
                    // setBuildStatus("Build failed", "FAILURE");
                    sh """
                        curl -L \
                            -X POST \
                            -H "Accept: application/vnd.github+json" \
                            -H "Authorization: Bearer ${TOKEN}" \
                            -H "X-GitHub-Api-Version: 2022-11-28" \
                            https://api.github.com/repos/Mykyta-Lystopad/homework/statuses/b7b8c6270097baf7f88e8fbf9a8247b29e92be4b \
                            -d '{"state":"failured","target_url":"https://Mykyta-Lystopad/homework/build/status", \
                            "description":"The build:${currentBuild.currentResult}!","context":"continuous-integration/jenkins:${env.JOB_NAME}"}'
                    """
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
