import React from "react";
import api from "../api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Songs.module.css";

const CoursesPage = ({ courses }) => {
  if (!courses) {
    return "Cargando cursos ...";
  }

  return (
    <div>
      <Head>
        <title>Poli Cursos </title>
      </Head>

      <h2>Lista de Cursos</h2>
      <Link href="/"> Volver al Inicio</Link>
      <div className={styles.songsContent}>
        {courses.map((course) => (
          <Link href={`/courses/${course.id}`}>
            <div key={course.id} className={styles.songTarjet}>
              <Image src={course.photo} width={640} height={480} />
              <div className={styles.songInfo}>
                <p>NOMBRE: {course.name}</p>
                <br></br>
                <p>{course.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;

export async function getStaticProps(context) {
  let courses = [];
  try {
    const response = await api.get("/courses");
    console.log("response", response);
    courses = response.data.data;
  } catch (e) {}

  return {
    props: {
      courses,
    },
  };
}
