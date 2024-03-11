export const validateAccountNumberMod11 = (accountNumber?: string) => {
  if (!accountNumber) {
    return false;
  }

  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  const accountNumberWithoutSpacesAndPeriods = accountNumber.replace(/[\s.]+/g, '');
  if (accountNumberWithoutSpacesAndPeriods.length !== 11) {
    return false;
  } else {
    const checkDigit = parseInt(accountNumberWithoutSpacesAndPeriods.charAt(10), 10);
    const accountNumberWithoutCheckDigit = accountNumberWithoutSpacesAndPeriods.substring(0, 10);
    let sum = 0;
    for (let index = 0; index < 10; index++) {
      sum += parseInt(accountNumberWithoutCheckDigit.charAt(index), 10) * weights[index];
    }
    const remainder = sum % 11;
    return checkDigit === (remainder === 0 ? 0 : 11 - remainder);
  }
};
