const generate = (amount: number, content: string) => {
  const bankName = "bidv";
  const bankAccount = "7411169464";

  const url = `https://img.vietqr.io/image/${bankName}-${bankAccount}-compact2.jpg?amount=${amount}&addInfo=${content}`;
  return url;
}

const vietqrHelper = {
  generate
};
export default vietqrHelper;