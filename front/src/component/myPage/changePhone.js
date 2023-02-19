const changePhone = {
  phoneNumberBlur(e) {
    const target = e.target;
    let phoneNumber = target.value;

    if (target.value.length <= 8) phoneNumber = `010${phoneNumber}`;
    phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

    target.value = phoneNumber;
  },

  phoneNumberChange(e) {
    const target = e.target;
    let phoneNumber = target.value.replace(/[^0-9\-]/g, "");

    if (phoneNumber.length > 13) {
      phoneNumber = phoneNumber.substr(0, 13);
    }

    target.value = phoneNumber;
  },
};

export default changePhone;
