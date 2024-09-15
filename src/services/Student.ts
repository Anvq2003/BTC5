import CONFIG from '@/config';
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
    const response = await fetch(CONFIG.URL + "/api/student", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to create student:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

const getStudents = async () => {
  return await fetch(CONFIG.URL + "/api/student", {
    method: "GET",
  });
};

const StudentService = {
  createStudent,
  getStudents,
};

export default StudentService;
