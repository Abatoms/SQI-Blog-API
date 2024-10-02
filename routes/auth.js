const express = require("express");
const {
  register,
  login,
  verifyEmailAddress,
  resendEmailVerificationUrl,
} = require("./../controllers/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email/resend", resendEmailVerificationUrl);
router.get("/verify-email/:email/:verificationToken", verifyEmailAddress);

module.exports = router;
