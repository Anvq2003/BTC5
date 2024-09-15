import { connectToDB } from '@/lib/db';

export const POST = async (request: any) => {
  const payload = await request.json();

  const {
    student_id,
    fullname,
    birthdate,
    gender,
    address,
    phone_number,
    email,
    major,
  } = payload;

  try {
    const pool = await connectToDB();

    const query = `
      INSERT INTO student (student_id, fullname, birthdate, gender, address, phone_number, email, major)
      VALUES (@student_id, @fullname, @birthdate, @gender, @address, @phone_number, @email, @major)
    `;

    const request = pool
      .request()
      .input('student_id', student_id)
      .input('fullname', fullname)
      .input('birthdate', birthdate)
      .input('gender', gender)
      .input('address', address)
      .input('phone_number', phone_number)
      .input('email', email)
      .input('major', major)

    await request.query(query);
    return new Response(JSON.stringify({ message: 'Student created successfully' }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to create a new student', error: error }),
      { status: 500 },
    );
  }
};
