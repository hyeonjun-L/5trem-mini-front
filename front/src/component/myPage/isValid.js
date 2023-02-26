const isValid = {
  PhoneNum(phoneNum) {
    const regex = /^010-\d{4}-\d{4}$/;
    return regex.test(phoneNum);
  },

  Email(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  },
};

export default isValid;
