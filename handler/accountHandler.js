// Handler untuk create data account
exports.createAccount = (req, res) => {
  const {
    accountName,
    accountNumber,
    customerId,
    initialBalance,
    accountType,
  } = req.body;

  // Simulasi penyimpanan ke database
  const newAccount = {
    id: Date.now(),
    accountName,
    accountNumber,
    customerId,
    accountType: accountType,
    initialBalance: initialBalance,
    createdAt: new Date().toISOString(),
  };

  console.log("Akun baru dibuat:", newAccount);

  // Kirim respon sukses
  return res.status(201).json({
    status: "SUCCESS",
    message: "Account created successfully ",
    data: newAccount,
  });
};
