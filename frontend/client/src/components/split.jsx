function splitString(inputString) {
    const characters = [];
    const regex = /[\s\S]/gu; // Matches any character, including newlines

    let match;
    while ((match = regex.exec(inputString)) !== null) {
        characters.push(match[0]);
    }

    return characters;
}

export default splitString;
