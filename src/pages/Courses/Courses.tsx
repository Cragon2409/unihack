import { useState } from "react";
import { Typography, Button, Flex, Modal } from 'antd';


const { Title } = Typography;

const courseButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

export default function Courses() {
  const [courses, setCourses] = useState<string[]>([]);
  const [isCourseInfoModalOpen, setIsCourseInfoModalOpen] = useState(false);
  const [isCourseAddModalOpen, setIsCourseAddModalOpen] = useState(false);

  const addCourse = () => {
    showCourseAddModal()
  };

  const showCourseInfoModal = () => {
    setIsCourseInfoModalOpen(true);
  };

  const showCourseAddModal = () => {
    setIsCourseAddModalOpen(true);
  };

  const handleCourseInfoOk = () => {
    setIsCourseInfoModalOpen(false);
  };

  const handleCourseInfoCancel = () => {
    setIsCourseInfoModalOpen(false);
  };

  const handleCourseAddOk = () => {
    setIsCourseAddModalOpen(false);
    setCourses([...courses, "Course Name"]);
  };

  const handleCourseAddCancel = () => {
    setIsCourseAddModalOpen(false);
  };

  return (
    <>
      <Flex gap="small" align="center">
        <Title>Courses</Title>
        <Button onClick={addCourse}> Add Course </Button>
      </Flex>
      <div className="course-container">
        <Flex wrap gap="small">
          {courses.map((course, index) => (
            <Button style={courseButtonStyle} onClick={showCourseInfoModal} key={index}> {course} </Button>
          ))}
            <Button style={courseButtonStyle} onClick={showCourseInfoModal}> Woah a Course </Button>
        </Flex>

        <Modal title="Add Course Modal" open={isCourseAddModalOpen} onOk={handleCourseAddOk} onCancel={handleCourseAddCancel}>
          <p>Assessments</p>
        </Modal>
        <Modal title="Basic Modal" open={isCourseInfoModalOpen} onOk={handleCourseInfoOk} onCancel={handleCourseInfoCancel}>
          <p>Assessments</p>
          <p>Grades</p>
        </Modal>
      </div>
    </>
  )
}