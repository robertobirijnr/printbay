
const dbName = process.env.NODE_ENV === "test" ? 'print_bay':'printBay'

module.exports = {
    DB_URI:'mongodb+srv://robert:e6hQzW16druiPGG1@cluster0.o07wn.mongodb.net/meetup?retryWrites=true&w=majority',
    DB_URI_LOCAL:`mongodb://127.0.0.1:27017/${dbName}`,
    SESSION_SECRETE:'JKDSJDKSIODUDMKSDJKSJDK',
    JWT_SECRETE:"jdsjhdksjdk"
}