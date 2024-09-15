import { connectToDB } from "@/lib/db";

export const GET = async () => {
  try {
    const pool = await connectToDB();
    const query = ` SELECT s.student_id, s.gender, s.email, s.fullname, g.class_id,
                      AVG(g.score) AS average_score
                      FROM student s
                      JOIN grades g ON s.student_id = g.student_id
                      WHERE g.class_id = 'KD534A'
                      GROUP BY s.student_id, s.gender, s.email, s.fullname, g.class_id
                      ORDER BY s.student_id;`;
    const result = await pool.request().query(query);
    return new Response(JSON.stringify(result?.recordset), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch result", { status: 500 });
  }
};
