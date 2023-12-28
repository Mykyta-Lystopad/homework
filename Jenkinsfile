void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/Mykyta-Lystopad/homework.git"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}



pipeline {
    agent { label 'docker' }

    options {
      withCredentials([
        string(credentialsId: 'git-token-2', variable: 'TOKEN')
      ])
    }

    stages {
        stage('Clean workspace') {
            steps {
                cleanWs()
            }
        }

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
                    echo "Lint Dockerfile Stage"
                    echo "JENKINS_HOME: ${JENKINS_HOME}"
                    echo "JOB_NAME: ${JOB_NAME}"
                    echo "WORKSPACE: ${WORKSPACE}"
                    
                    def workspacePath = "${WORKSPACE}"
                    def dockerfilePath = "${workspacePath}/Dockerfile"
                    def lintResultFile = "${workspacePath}/hadolint_result.txt"

                    echo "dockerfilePath: ${dockerfilePath}  lintResultFile: ${lintResultFile}"

                    // Print the content of the workspace directory
                    sh "ls -la ${workspacePath}"

                    // Make sure the Dockerfile exists
                    if (fileExists(dockerfilePath)) {
                        echo "Dockerfile found at: ${dockerfilePath}"
                        // Use installed Hadolint to lint the Dockerfile
                        def hadolintCommand = "/usr/local/bin/hadolint ${dockerfilePath} > ${lintResultFile}"
                        echo "Executing: ${hadolintCommand}"
                        

                        // Display linting results in the console
                        echo "Linting Results:"
                        sh "cat ${lintResultFile}"

                    } else {
                        error "Dockerfile not found at path: ${dockerfilePath}"
                    }
                }
            }

            post {
                success {
                    script {
                        echo 'Jenkins CI pipeline succeeded. Triggering Jenkins CD pipeline.'
                    
                        def currentSHA = env.GIT_COMMIT
                            setBuildStatus("Build succeeded", "SUCCESS");
                            echo """
                                curl -L \
                                -X POST \
                                -H "Accept: application/vnd.github+json" \
                                -H "Authorization: Bearer ${TOKEN}" \
                                -H "X-GitHub-Api-Version: 2022-11-28" \
                                https://api.github.com/repos/Mykyta-Lystopad/homework/statuses/${currentSHA} \
                                -d '{"state":"success","target_url":"https://Mykyta-Lystopad/homework/build/status", \
                                "description":"The build succeeded!","context":"continuous-integration/jenkins:${env.JOB_NAME}"}'
                            """
                            // Now, execute the curl command
                            sh """
                                curl -L \
                                    -X POST \
                                    -H "Accept: application/vnd.github+json" \
                                    -H "Authorization: Bearer ${TOKEN}" \
                                    -H "X-GitHub-Api-Version: 2022-11-28" \
                                    https://api.github.com/repos/Mykyta-Lystopad/homework/statuses/${currentSHA} \
                                    -d '{"state":"success","target_url":"https://Mykyta-Lystopad/homework/build/status", \
                                    "description":"The build succeeded!","context":"continuous-integration/jenkins:${env.JOB_NAME}"}'
                            """
                    }
                }
                failure {
                    echo "Jenkins CI pipeline failed."
                    script {
                        // if (env.CHANGE_ID) {
                        // This build is associated with a pull request
                        def currentSHA = env.GIT_COMMIT
                            setBuildStatus("Build failed", "FAILURE");
                            echo """
                                curl -L \
                                -X POST \
                                -H "Accept: application/vnd.github+json" \
                                -H "Authorization: Bearer ${TOKEN}" \
                                -H "X-GitHub-Api-Version: 2022-11-28" \
                                https://api.github.com/repos/Mykyta-Lystopad/homework/statuses/${currentSHA} \
                                -d '{"state":"failure","target_url":"https://Mykyta-Lystopad/homework/build/status", \
                                "description":"The build failured!","context":"continuous-integration/jenkins:${env.JOB_NAME}"}'
                            """
                            // Now, execute the curl command
                            sh """
                                curl -L \
                                    -X POST \
                                    -H "Accept: application/vnd.github+json" \
                                    -H "Authorization: Bearer ${TOKEN}" \
                                    -H "X-GitHub-Api-Version: 2022-11-28" \
                                    https://api.github.com/repos/Mykyta-Lystopad/homework/statuses/${currentSHA} \
                                    -d '{"state":"failure","target_url":"https://Mykyta-Lystopad/homework/build/status", \
                                    "description":"The build failured!","context":"continuous-integration/jenkins:${env.JOB_NAME}"}'
                            """
                        // }
                    }
                }
                always {
                    echo "This will always run."
                    // Add more logging or actions here
                }
            }
        
        }

        stage('Finalized') {
            steps {
                echo "Finalized..."
            }
        }

    }
}
