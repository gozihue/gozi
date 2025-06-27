function showForm(formId, button) {
  document.querySelectorAll('.auth-form').forEach(form => {
    form.classList.remove('active');
  });

  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });

  document.getElementById(formId + '-form').classList.add('active');
  button.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginError = document.getElementById('login-error');
  const registerError = document.getElementById('register-error');

  // Xử lý đăng nhập
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const username = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();
      loginError.textContent = '';

      if (!username || !password) {
        loginError.textContent = '❌ Vui lòng nhập đầy đủ thông tin.';
        return;
      }

      if (username === 'admin' && password === '1234') {
        alert('✅ Đăng nhập Admin thành công!');
        window.location.href = 'Admin.html';
      } else if (username === 'gozi' && password === '1234') {
        alert('✅ Đăng nhập thành công!');
        window.location.href = 'main.html';
      } else if (username === 'gozi123' && password === '1234') {
        alert('✅ Đăng nhập thành công!');
        window.location.href = 'quan_ly.html';
      } else {
        loginError.textContent = '❌ Sai tài khoản hoặc mật khẩu.';
      }


    });
  }

  // Xử lý đăng ký
  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = document.getElementById('register-email').value.trim();
      const username = document.getElementById('register-username').value.trim();
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      registerError.textContent = '';

      if (!email || !username || !password || !confirmPassword) {
        registerError.textContent = '❌ Vui lòng điền đầy đủ thông tin.';
        return;
      }

      if (password !== confirmPassword) {
        registerError.textContent = '❌ Mật khẩu không khớp.';
        return;
      }

      alert('✅ Đăng ký thành công!');
      // 👉 Sau khi đăng ký, có thể tự động chuyển sang form đăng nhập:
      showForm('login', document.querySelector('.tab-button:first-child'));
    });
  }
});
