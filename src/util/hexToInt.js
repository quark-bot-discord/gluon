function hexToInt(rrggbb) {

    const bbggrr = rrggbb.substr(4, 2) + rrggbb.substr(2, 2) + rrggbb.substr(0, 2);
    return parseInt(bbggrr, 16);
    
}

module.exports = hexToInt;