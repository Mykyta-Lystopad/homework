def sharedStages() {
    echo "Hello, World!"
}

return this


// // sharedPipeline.groovy

// def call() {
//     // No need for 'return this'
// }

// def sharedStages() {
//     return {
//         stage('Fetch Docker Image Tags') {
//             steps {
//                 script {
//                     echo "stage = Fetch Docker Image Tags"
//                     def registry = 'https://registry.hub.docker.com/v2/repositories/nominonik/google-class/tags'

//                     // Fetching tags from Docker Hub with authentication
//                     def response = sh(script: "curl -u ${DOCKERHUB_USERNAME}:${DOCKERHUB_PASSWORD} -s ${registry}", returnStdout: true).trim()

//                     echo "response: ${response}"

//                     // Parse the JSON response
//                     def imageNames = sh(script: "echo ${response} | grep -oE 'google-class-[^,]*'", returnStdout: true).trim()

//                     echo "Docker Image Names: ${imageNames}"

//                     // Split the newline-separated string into a list of strings
//                     def choicesList = imageNames.split('\n')

//                     // Convert Groovy list to Java list using collect
//                     def javaChoicesList = choicesList.collect { it.trim() }

//                     // Set the choices for the VERSION parameter
//                     properties([
//                         parameters([
//                             string(name: 'ENVIRONMENT', defaultValue: 'dev', description: 'Write the target environment (dev or qa)'),
//                             choice(name: 'VERSION', choices: javaChoicesList, description: 'Choose the version')
//                         ])
//                     ])
//                 }
//             }
//         }
//     }
// }
