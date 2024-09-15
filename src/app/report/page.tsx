'use client';
import StudentService from '@/services/Student';
import { useEffect, useState } from 'react';
import styles from './report.module.css'; // Import file CSS

const Report = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await StudentService.getStudents();
      setData(result);
      console.log(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Báo cáo điểm trung bình</h1>
        <p>Lớp: KD534A</p>
      </header>
      <main className={styles.detail}>
        <table>
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Giới tính</th>
              <th>Mã lớp</th>
              <th>Điểm trung bình</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item: any) => (
                <tr key={item.student_id}>
                  <td>{item.student_id}</td>
                  <td>{item.fullname}</td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td>{item.class_id}</td>
                  <td>{item.average_score.toFixed(2)}</td>
                </tr>
              ))
            ) : loading ? (
              <tr>
                <td colSpan={4}>Đang tải dữ liệu...</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={4}>No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 - Bản quyền thuộc về trường Đại học ABC</p>
      </footer>
    </div>
  );
};

export default Report;
