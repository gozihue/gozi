// Chuyển đổi giữa form đăng nhập và đăng ký
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

  // Xử lý Đăng Nhập
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

      // Gửi POST tới server đăng nhập
      fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('✅ ' + data.message);
          // 👉 Chuyển sang main.html sau khi đăng nhập thành công
          window.location.href = 'main.html';
        } else {
          loginError.textContent = '❌ ' + data.message;
        }
      })
      .catch(error => {
        console.error('Lỗi:', error);
        loginError.textContent = '❌ Không thể kết nối tới server.';
      });
    });
  }

  // Xử lý Đăng Ký
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

      // Gửi POST tới server đăng ký
      fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, password })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('✅ ' + data.message);
          // Tự động chuyển về form đăng nhập
          showForm('login', document.querySelector('.tab-button:first-child'));
        } else {
          registerError.textContent = '❌ ' + data.message;
        }
      })
      .catch(error => {
        console.error('Lỗi:', error);
        registerError.textContent = '❌ Không thể kết nối tới server.';
      });
    });
  }
});
