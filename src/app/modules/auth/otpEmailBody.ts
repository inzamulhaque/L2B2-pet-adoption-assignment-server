const otpEmailBody = (otp: Number): String => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 500px;
            background: #ffffff;
            padding: 20px;
            margin: 40px auto;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h2 {
            color: #333;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            background:rgba(71, 5, 236, 0.7);
            padding: 10px;
            display: inline-block;
            border-radius: 5px;
            margin: 10px 0;
        }
        p {
            color: #555;
            font-size: 16px;
        }
        .footer {
            font-size: 12px;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Password Reset Request</h2>
        <p>You recently requested to reset your password. Use the OTP below to proceed:</p>
        <div class="otp">${otp}</div>
        <p><strong>Note:</strong> This OTP is valid for <strong>5 minutes</strong>. Do not share this code with anyone.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p class="footer">&copy; 2025 Your Company. All rights reserved.</p>
    </div>
</body>
</html>
`;
};

export default otpEmailBody;
