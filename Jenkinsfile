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
        // usernamePassword(credentialsId: "git", passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')
      ])
    }

    // environment {
    //     GITHUB_CREDENTIALS = credentials('git') // Replace 'vagrant' with your actual credentials ID
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
                    script {
                    //     if (env.CHANGE_ID) {
                    //         // This build is associated with a pull request
                            def currentSHA = env.GIT_COMMIT
                                // setBuildStatus("Build succeeded", "SUCCESS");
                                sh """
                                    echo "currentSHA - ${currentSHA}"
                                    curl -L \
                                        -X POST \
                                        -H "Accept: application/vnd.github+json" \
                                        -H "Authorization: Bearer ${TOKEN}" \
                                        -H "X-GitHub-Api-Version: 2022-11-28" \
                                        https://api.github.com/repos/Mykyta-Lystopad/homework/statuses/${currentSHA} \
                                        -d '{"state":"success","target_url":"https://Mykyta-Lystopad/homework/build/status", \
                                        "description":"The build:${currentBuild.currentResult}!","context":"continuous-integration/jenkins:${env.JOB_NAME}"}'
                                """
                        //     }
                    }
                    // script {
                    //     def currentSHA = env.GIT_COMMIT
                    //     echo "currentSHA - ${currentSHA}"
                    //     def response = sh(
                    //         script: """
                    //             curl -L -X POST -H 'Accept: application/vnd.github+json' \\
                    //             -H 'Authorization: Bearer $GITHUB_CREDENTIALS' \\
                    //             -H 'X-GitHub-Api-Version: 2022-11-28' \\
                    //             https://api.github.com/repos/Mykyta-Lystopad/homework/statuses/${currentSHA} \\
                    //             -d '{"state":"success","target_url":"https://Mykyta-Lystopad/homework/build/status", \\
                    //             "description":"The build:\${currentBuild.currentResult}!","context":"continuous-integration/jenkins:\${env.JOB_NAME}"}'
                    //         """,
                    //         returnStatus: true
                    //     )
                    //     if (response != 0) {
                    //         error "Failed to update GitHub status"
                    //     }
                    // }
                }    

                failure {
                    script {
                    //     if (env.CHANGE_ID) {
                    //         // This build is associated with a pull request
                            def currentSHA = env.GIT_COMMIT
                                // setBuildStatus("Build failed", "FAILURE");
                                sh """
                                    curl -L \
                                        -X POST \
                                        -H "Accept: application/vnd.github+json" \ 
                                        -H "Authorization: Bearer ${TOKEN}" \
                                        -H "X-GitHub-Api-Version: 2022-11-28" \
                                        https://api.github.com/repos/Mykyta-Lystopad/homework/statuses/${currentSHA} \
                                        -d '{"state":"failure","target_url":"https://Mykyta-Lystopad/homework/build/status", \
                                        "description":"The build:${currentBuild.currentResult}!","context":"continuous-integration/jenkins:${env.JOB_NAME}"}'
                                """
                    //         }
                    }
                    // script {
                    //     def currentSHA = env.GIT_COMMIT
                    //     echo "currentSHA - ${currentSHA}"
                    //     def response = sh(
                    //         script: """
                    //             curl -L -X POST -H 'Accept: application/vnd.github+json' \\
                    //             -H 'Authorization: Bearer $GITHUB_CREDENTIALS' \\
                    //             -H 'X-GitHub-Api-Version: 2022-11-28' \\
                    //             https://api.github.com/repos/Mykyta-Lystopad/homework/statuses/${currentSHA} \\
                    //             -d '{"state":"failure","target_url":"https://Mykyta-Lystopad/homework/build/status", \\
                    //             "description":"The build:\${currentBuild.currentResult}!","context":"continuous-integration/jenkins:\${env.JOB_NAME}"}'
                    //         """,
                    //         returnStatus: true
                    //     )
                    //     if (response != 0) {
                    //         error "Failed to update GitHub status"
                    //     }
                    // }
                }

                // Sending notification to gmail
                // always {
                //     emailext to: "niktoring77@gmail.com",
                //     subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                //     body: """
                //     Logs from Jenkins pipeline:
                //     ${currentBuild.rawBuild.getLog(100)}
                //     """,
                //     attachLog: true
                // }
            }


        }
    }
}
