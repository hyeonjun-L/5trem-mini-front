import overlapApi from "../../api/OverlapApi";

const overlap = {
  idCheck: async (id) => {
    if (!id) return ["", ""];

    const overlapCheck = await overlapApi(id, "id");
    const text = overlapCheck.success
      ? "이미 사용중인 아이디 입니다."
      : "사용가능한 아이디 입니다.";

    return [overlapCheck.success, text];
  },
  nickNameCheck: async (nickName) => {
    if (!nickName) return ["", ""];

    const overlapCheck = await overlapApi(nickName, "nickName");
    const text = overlapCheck.success
      ? "이미 사용중인 닉네임 입니다."
      : "사용 가능한 닉네임 입니다";

    return [overlapCheck.success, text];
  },
  passwordCheck(password, checkPassword) {
    const same = !(password === checkPassword);
    const text =
      checkPassword === "" ? "" : same ? "비밀번호가 일치하지 않습니다." : "";

    return [same, text];
  },
};

export default overlap;
