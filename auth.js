<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Sign in · IT Master Tool</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/app.css">
</head>
<body>
<main class="auth-wrap">
  <div class="auth-card">
    <header><small>Lester Glenn IT Department</small><h1>IT Master Tool</h1></header>
    <div style="padding:20px 22px">
      <p class="intro" id="msg">Sign in with your Microsoft 365 work account, the same one you use for Outlook and Teams.</p>
      <a class="btn primary" id="msBtn" href="/api/auth/microsoft" style="display:block;text-align:center;text-decoration:none;width:100%;padding:11px 14px">Sign in with Microsoft</a>
      <p class="intro" style="margin:14px 0 0">Can't get in? Ask an IT manager to add you.</p>
    </div>
  </div>
</main>
<script src="/login.js"></script>
</body>
</html>
