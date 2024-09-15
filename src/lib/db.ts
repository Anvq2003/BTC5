const sql = require('mssql');
import CONFIG from '@/config';

const config = {
  user: CONFIG.DB_USER, // Tên người dùng của SQL Server trên Azure
  password: CONFIG.DB_PASSWORD, // Mật khẩu
  database: CONFIG.DB_NAME, // Tên cơ sở dữ liệu
  server: CONFIG.DB_SERVER, // Tên hoặc địa chỉ IP của SQL Server trên Azure
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // Azure yêu cầu mã hóa
    trustServerCertificate: false, // Yêu cầu chứng chỉ bảo mật
  },
};

export async function connectToDB() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error('Database connection failed: ', err);
  }
}

export async function createTableStudent() {
  try {
    const pool = await sql.connect(config);
    const query = `CREATE TABLE student (
                    student_id CHAR(8) PRIMARY KEY,
                    fullname NVARCHAR(100) NOT NULL,
                    birthdate DATE NOT NULL,
                    gender NVARCHAR(10) CHECK (gender IN ('Nam', 'Nu')),
                    address NVARCHAR(255),
                    phone_number VARCHAR(15),
                    email NVARCHAR(100),
                    major NVARCHAR(50),
                    class NVARCHAR(50),
                    avatar_url NVARCHAR(255)
                  );`;
    const result = await pool.request().query(query);
    console.debug('result', result);
  } catch (err) {
    console.error('Database connection failed: ', err);
  }
}
