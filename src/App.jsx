// App.jsx - Main Dashboard Component that combines all subcomponents
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import StudentTable from './components/StudentTable';
import RecentActivity from './components/RecentActivity';
import {
  departmentOptions,
  initialStudents,
  newStudentDefaults,
  summaryCardData,
} from './data/dashboardData';
import './App.css';

function App() {
  // useState stores changing dashboard data and makes the UI update after each action.
  const [students, setStudents] = useState(initialStudents);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [newStudent, setNewStudent] = useState(newStudentDefaults);

  const departments = [...new Set(students.map((student) => student.department))];
  const summaryCards = summaryCardData.map((card) => {
    if (card.id === 'totalStudents') {
      return { ...card, value: students.length };
    }

    if (card.id === 'departments') {
      return { ...card, value: departments.length };
    }

    return card;
  });

  // Props let the reusable table receive the current student records.
  const handleAddStudent = (event) => {
    event.preventDefault();
    setStudents((currentStudents) => [
      ...currentStudents,
      {
        ...newStudent,
        id: Date.now(),
        gpa: '0.00',
        status: 'Active',
      },
    ]);
    setNewStudent(newStudentDefaults);
    setIsAddFormVisible(false);
  };

  const handleDeleteStudent = (studentId) => {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId)
    );
  };

  const handleNewStudentChange = (event) => {
    const { name, value } = event.target;
    setNewStudent((currentStudent) => ({
      ...currentStudent,
      [name]: value,
    }));
  };

  return (
    <div className={`dashboard-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* 1. Left Navigation Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
      />

      {/* 2. Main Content Area */}
      <div className="main-wrapper">
        {/* Top Header */}
        <Header />

        {/* Dashboard Main Workspace */}
        <main className="dashboard-content">
          {/* Key Metric Summary Cards */}
          <SummaryCards cards={summaryCards} />

          {/* Main Content Grid: Table and Recent Activity */}
          <div className="content-grid">
            <StudentTable
              students={students}
              departmentOptions={departmentOptions}
              isAddFormVisible={isAddFormVisible}
              onToggleAddForm={() => setIsAddFormVisible((visible) => !visible)}
              newStudent={newStudent}
              onNewStudentChange={handleNewStudentChange}
              onAddStudent={handleAddStudent}
              onDeleteStudent={handleDeleteStudent}
            />
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
