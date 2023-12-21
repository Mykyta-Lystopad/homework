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

        // stage("Lint Dockerfile") {
        //     agent {
        //         label 'docker'
        //     }

        //     steps {
        //         script {
        //             // Check the Dockerfile path relative to your workspace
        //             def dockerfilePath = "Dockerfile"
        
        //             // Make sure the Dockerfile exists
        //             if (fileExists(dockerfilePath)) {
        //                 // Use hadolint Docker image to lint the Dockerfile
        //                 sh "docker run --rm -i hadolint/hadolint:latest-debian < ${dockerfilePath}"

        //                 // Archive linting results as an artifact
        //                 archiveArtifacts artifacts: 'hadolint_result.txt', fingerprint: true

        //             } else {
        //                 error "Dockerfile not found at path: ${dockerfilePath}"
        //             }
        //         }
        //     }

        stage("Lint Dockerfile") {
            agent {
                label 'docker'
            }

            steps {
                script {
                    echo "Lint Dockerfile Stage"
                    // Check the Dockerfile path relative to your workspace
                    def dockerfilePath = "Dockerfile"
                    def lintResultFile = "hadolint_result.txt"

                    echo "hadolint < ${dockerfilePath} > ${lintResultFile}"

                    // Make sure the Dockerfile exists
                    if (fileExists(dockerfilePath)) {
                        // Use installed Hadolint to lint the Dockerfile
                        sh "hadolint < ${dockerfilePath} > ${lintResultFile}"

                        echo "dockerfilePath: ${dockerfilePath} > lintResultFile: ${lintResultFile}"

                        echo "pwd: $pwd"

                        // Display linting results in the console
                        echo "Linting Results:"
                        sh "cat ${lintResultFile}"

                        // Prompt the user to read linting message
                        def userInput = input(
                            message: 'Do you want to read the linting message?',
                            ok: 'Yes',
                            parameters: [string(defaultValue: 'No', description: 'Select Yes to read the linting message', name: 'readLintMessage')]
                        )

                        // Handle user input
                        if (userInput == 'Yes') {
                            echo "User wants to read the linting message."
                        } else {
                            echo "User chose not to read the linting message."
                        }
                        
                    } else {
                        error "Dockerfile not found at path: ${dockerfilePath}"
                    }
                }
            }



            post {
                success{
                    script {
                        if (env.CHANGE_ID) {
                            // This build is associated with a pull request
                            def currentSHA = env.GIT_COMMIT
                                // setBuildStatus("Build succeeded", "SUCCESS");
                                sh """
                                    curl -L \
                                        -X POST \
                                        -H "Accept: application/vnd.github+json" \
                                        -H "Authorization: Bearer ${TOKEN}" \
                                        -H "X-GitHub-Api-Version: 2022-11-28" \
                                        https://api.github.com/repos/Mykyta-Lystopad/homework/statuses/${currentSHA} \
                                        -d '{"state":"success","target_url":"https://Mykyta-Lystopad/homework/build/status", \
                                        "description":"The build:${currentBuild.currentResult}!","context":"continuous-integration/jenkins:${env.JOB_NAME}"}'
                                """
                            }
                        }
                }    

                failure {
                    script {
                        if (env.CHANGE_ID) {
                            // This build is associated with a pull request
                            def currentSHA = env.GIT_COMMIT
                                // setBuildStatus("Build failed", "FAILURE");
                                sh """
                                    curl -L \
                                        -X POST \
                                        -H "Accept: application/vnd.github+json" \
                                        -H "Authorization: Bearer ${TOKEN}" \
                                        -H "X-GitHub-Api-Version: 2022-11-28" \
                                        https://api.github.com/repos/Mykyta-Lystopad/homework/statuses/${currentSHA} \
                                        -d '{"state":"failured","target_url":"https://Mykyta-Lystopad/homework/build/status", \
                                        "description":"The build:${currentBuild.currentResult}!","context":"continuous-integration/jenkins:${env.JOB_NAME}"}'
                                """
                            }
                    }
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
