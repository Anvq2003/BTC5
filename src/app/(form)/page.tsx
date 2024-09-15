'use client';
import StudentService, { IStudent } from '@/services/Student';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, message } from 'antd';
import styles from './form.module.css';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
const { Option } = Select;

const CreateStudentForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: IStudent) => {
    const newValues = { ...values };
    newValues.birthdate = dayjs(values.birthdate).toISOString();
    console.log('newValues', newValues);
    setLoading(true);
    // try {
    //   await StudentService.createStudent(values);
    //   message.success('Tạo sinh viên thành công!');
    //   form.resetFields();
    // } catch (error) {
    //   message.error('Tạo sinh viên thất bại!');
    //   console.error('error', error);
    // }
    setLoading(false);
  };

  useEffect(() => {
    // Auto-generate student_id when the form is loaded
    const generateStudentId = () => {
      const prefix = 'MS';
      const suffix = Math.floor(100000 + Math.random() * 900000).toString(); // Random 8 digits
      return `${prefix}${suffix}`;
    };

    form.setFieldsValue({ student_id: generateStudentId() });
  }, [form]);

  const fieldConfig = [
    {
      name: 'student_id',
      label: 'Mã sinh viên',
      type: 'input',
      rules: [{ required: true, message: 'Vui lòng nhập mã sinh viên!' }],
      disabled: true,
    },
    {
      name: 'fullname',
      label: 'Họ và tên',
      type: 'input',
      rules: [{ required: true, message: 'Vui lòng nhập họ và tên!' }],
    },
    {
      name: 'birthdate',
      label: 'Ngày sinh',
      type: 'datepicker',
      rules: [{ required: true, message: 'Vui lòng chọn ngày sinh!' }],
    },
    {
      name: 'gender',
      label: 'Giới tính',
      type: 'radio',
      options: ['Nam', 'Nữ'],
      rules: [{ required: true, message: 'Vui lòng chọn giới tính!' }],
    },
    { name: 'address', label: 'Địa chỉ', type: 'input', rules: [] },
    { name: 'phone_number', label: 'Số điện thoại', type: 'input', rules: [] },
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      rules: [{ type: 'email', message: 'Email không đúng định dạng' }],
    },
    {
      name: 'major',
      label: 'Ngành học',
      type: 'select',
      options: ['Công nghệ thông tin', 'Kinh tế', 'Quản trị kinh doanh', 'Khác'],
      rules: [],
    },
    { name: 'class', label: 'Lớp', type: 'input', rules: [] },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Tạo Sinh Viên Mới</h1>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={16}>
            {fieldConfig.map((field) => (
              <Col key={field.name} span={12}>
                <Form.Item name={field.name} label={field.label} rules={field.rules as any}>
                  {field.type === 'input' && <Input disabled={field.disabled} />}
                  {field.type === 'datepicker' && <DatePicker style={{ width: '100%' }} />}
                  {field.type === 'select' && (
                    <Select>
                      {field.options?.map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  )}
                  {field.type === 'radio' && (
                    <Radio.Group>
                      {field.options?.map((option) => (
                        <Radio key={option} value={option}>
                          {option}
                        </Radio>
                      ))}
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Tạo sinh viên
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateStudentForm;
