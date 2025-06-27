from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ✅ Cho phép tất cả domain gửi request

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not password or not email:
        return jsonify({'success': False, 'message': 'Thiếu thông tin.'}), 400

    # Kiểm tra file tồn tại chưa, tạo nếu chưa có
    try:
        with open('users.txt', 'r') as f:
            lines = f.readlines()
    except FileNotFoundError:
        lines = []

    # Kiểm tra trùng username
    for line in lines:
        if line.split(',')[0] == username:
            return jsonify({'success': False, 'message': 'Tên đăng nhập đã tồn tại.'}), 409

    # Ghi vào file
    with open('users.txt', 'a') as f:
        f.write(f"{username},{email},{password}\n")

    return jsonify({'success': True, 'message': 'Đăng ký thành công!'}), 200


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    try:
        with open('users.txt', 'r') as f:
            lines = f.readlines()
    except FileNotFoundError:
        return jsonify({'success': False, 'message': 'Chưa có người dùng nào.'}), 404

    for line in lines:
        stored_username, _, stored_password = line.strip().split(',')
        if stored_username == username and stored_password == password:
            return jsonify({'success': True, 'message': 'Đăng nhập thành công!'}), 200

    return jsonify({'success': False, 'message': 'Sai tên đăng nhập hoặc mật khẩu.'}), 401


if __name__ == '__main__':
    app.run(debug=True)
