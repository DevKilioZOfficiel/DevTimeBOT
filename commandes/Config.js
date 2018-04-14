module.exports = class Config {

    static isStartingWith(message, word) {
        if(message.content.startsWith(word)) {
            return true;
        } else {
            return false;
        }
    }

}