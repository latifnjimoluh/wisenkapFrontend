// utils/generateResetCode.js

function generateResetCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Code à 6 chiffres
  }
  
  module.exports = generateResetCode;
  