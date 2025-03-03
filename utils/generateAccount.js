const generateAccount = () => {
  // Starting digits for the account number
  const firstDigit = "1064";

  // Generate the remaining 6 digits randomly
  const remainingDigits = Math.floor(100000 + Math.random() * 900000); // This will generate a number between 100000 and 999999

  // Combine the first digits with the randomly generated remaining digits
  const accountNumber = firstDigit + remainingDigits;

  return accountNumber;
};

module.exports = { generateAccount };
