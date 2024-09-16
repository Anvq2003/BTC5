import axios from 'axios';
export interface IStudent {
  student_id: string;       
  fullname: string;         
  birthdate: string;          
  gender: 'Nam' | 'Nữ';     
  address?: string;         
  phone_number?: string;    
  email?: string;           
  major?: string;           
}

const createStudent = async (payload: IStudent) => {
  try {
    const response = await axios.post(`/api/student`, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create student:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

const getStudents = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: '/api/student',
      timeout: 10000,
    })
    return response.data;
  } catch (error) {
    console.error("Failed to get students:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

const StudentService = {
  createStudent,
  getStudents,
};

export default StudentService;
