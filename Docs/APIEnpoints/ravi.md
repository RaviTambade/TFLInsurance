# Master API Endpoints Documentation

> Combined reference from all three API documentation files.

---

## Quick Reference Table — All Endpoints

| # | Method | Endpoint | Description | Source |
|---|--------|----------|-------------|--------|
| 1 | GET | `/api/projects` | Get all projects | Projects API |
| 2 | GET | `/api/projects/{id}` | Get project by ID | Projects API |
| 3 | GET | `/api/projects/{projectId}/students` | Get students allocated to project | Projects API |
| 4 | GET | `/api/projects/allocations` | Get all project allocations | Projects API |
| 5 | POST | `/api/projects/add` | Add student to project | Projects API |
| 6 | GET | `/api/projects/student/{studentId}/projects` | Get projects by student ID | Projects API |
| 7 | DELETE | `/api/projects/remove` | Remove student from project | Projects API |
| 8 | GET | `/api/questions/{question_id}` | Get question by ID | Questions API |
| 9 | GET | `/api/questions` | Get all questions | Questions API |
| 10 | GET | `/api/questions/difficulty/{level}` | Get questions by difficulty | Questions API |
| 11 | GET | `/api/questions/drafts` | Get draft questions | Questions API |
| 12 | PATCH | `/api/questions/{question_id}/status` | Update single question status | Questions API |
| 13 | PATCH | `/api/questions/status/{status}` | Update multiple question statuses | Questions API |
| 14 | GET | `/api/questions/recent` | Get questions between dates | Questions API |
| 15 | GET | `/api/questions/{question_id}/details` | Get complete question details | Questions API |
| 16 | PUT | `/api/questions/{question_id}` | Update question details | Questions API |
| 17 | GET | `/api/questions/status/{status}` | Get questions by status | Questions API |
| 18 | GET | `/api/questions/concepts/{conceptId}/questions` | Get questions by concept ID | Questions API |
| 19 | GET | `/api/questions/concepts/{concept}/count` | Get question count by concept | Questions API |
| 20 | GET | `/api/questions/type/{questionType}` | Get questions by type | Questions API |
| 21 | POST | `/api/questions/complete` | Insert complete question | Questions API |
| 22 | GET | `/api/filter/questions` | Filter questions (multi-param) | Questions API |
| 23 | POST | `/api/interview/schedule` | Schedule an interview | Interview API |
| 24 | GET | `/api/interview/details/{userId}/role/{roleId}/interview/{interviewId}` | Get interview details | Interview API |
| 25 | GET | `/api/interview/upcoming/{userId}/role/{roleId}` | Get upcoming interviews | Interview API |
| 26 | GET | `/api/interview/history/{userId}/role/{roleId}` | Get interview history | Interview API |
| 27 | PUT | `/api/interview/{interviewId}/cancel` | Cancel interview | Interview API |
| 28 | PUT | `/api/interview/accept/{interviewId}` | Accept interview | Interview API |
| 29 | PUT | `/api/interview/reject/{interviewId}` | Reject interview | Interview API |
| 30 | POST | `/api/interview/feedback` | Add interview feedback | Interview API |
| 31 | GET | `/api/interview/{roleId}` | Get interviews by role | Interview API |
| 32 | GET | `/api/technologies/concepts/question-count` | Get concept-wise question count | Technology API |
| 33 | GET | `/api/technologies/difficulty/question-count` | Get difficulty-wise question count | Technology API |
| 34 | POST | `/api/auth/login` | User login | TFL Auth API |
| 35 | POST | `/api/auth/register` | User registration | TFL Auth API |
| 36 | PUT | `/api/auth/changepassword` | Change password | TFL Auth API |
| 37 | GET | `/api/users/getAllUsers` | Get all users | TFL Users API |
| 38 | GET | `/api/users/:userId` | Get user details by ID | TFL Users API |
| 39 | GET | `/api/users/:userId/personal` | Get user personal details | TFL Users API |
| 40 | GET | `/api/users/:userId/academic` | Get user academic details | TFL Users API |
| 41 | GET | `/api/users/:userId/professional` | Get user professional details | TFL Users API |
| 42 | PATCH | `/api/users/:userId/personal-info` | Update user personal info | TFL Users API |
| 43 | PATCH | `/api/users/:userId/professional-info` | Update user professional info | TFL Users API |
| 44 | PATCH | `/api/users/:userId/academic-info` | Update user academic info | TFL Users API |
| 45 | PATCH | `/api/users/:userId/status` | Update user status | TFL Users API |
| 46 | GET | `/api/roles/getAllRoles` | Get all roles | TFL Roles API |
| 47 | POST | `/api/roles/createRole` | Create new role | TFL Roles API |
| 48 | PUT | `/api/roles/updateRole/:roleId` | Update role | TFL Roles API |
| 49 | GET | `/api/roles/getUserRolesByUserId/:userId` | Get roles by user ID | TFL Roles API |
| 50 | GET | `/api/roles/getUsersByRoleId/:roleId` | Get users by role ID | TFL Roles API |
| 51 | POST | `/api/roles/assignRole/:userId/role/:roleId` | Assign role to user | TFL Roles API |
| 52 | PUT | `/api/roles/unAssignRole/:userId/role/:roleId` | Unassign role from user | TFL Roles API |
| 53 | POST | `/api/useractivity/login/:userId/role/:roleId` | Record user login activity | TFL Activity API |
| 54 | PUT | `/api/useractivity/logout/:userId/role/:roleId` | Record user logout activity | TFL Activity API |
| 55 | GET | `/api/useractivity/logins-24h` | Get recent login count (24h) | TFL Activity API |
| 56 | GET | `/api/useractivity/average-time` | Get average session time | TFL Activity API |
| 57 | GET | `/api/useractivity/active-count` | Get active session count | TFL Activity API |
| 58 | GET | `/api/useractivity/active-users` | Get live/active users | TFL Activity API |
| 59 | GET | `/api/useractivity/logs` | Get all user activity logs | TFL Activity API |
| 60 | GET | `/api/mentors/:id/mentees/count` | Get mentee count for mentor | TFL Mentors API |
| 61 | GET | `/api/mentors/:id/mentees` | Get mentees list for mentor | TFL Mentors API |
| 62 | GET | `/api/Assessment/user/{userId}` | Get upcoming assessments for user | Assessment API |
| 63 | GET | `/api/Assessment/all` | Get all assessments | Assessment API |
| 64 | GET | `/api/Assessment/tests` | Get all tests | Assessment API |
| 65 | GET | `/api/Assessment/students` | Get all students | Assessment API |
| 66 | POST | `/api/Assessment/assigned` | Assign assessment to students | Assessment API |
| 67 | GET | `/api/Assessment/{assessmentId}/questions` | Get assessment questions | Assessment API |
| 68 | POST | `/api/Assessment/submit` | Submit assessment answers | Assessment API |
| 69 | GET | `/api/Assessment/{studentId}/{assessmentId}` | Get assessment result | Assessment API |
| 70 | GET | `/api/Assessment/total` | Get total assessments count | Assessment API |
| 71 | GET | `/api/Assessment/completed` | Get completed assessments count | Assessment API |
| 72 | DELETE | `/api/Assessment/InActive/{id}` | Deactivate assessment | Assessment API |
| 73 | POST | `/api/Assessment/cancel/test/{testId}` | Cancel assessments by test | Assessment API |
| 74 | POST | `/api/Assessment/restore/{id}` | Restore assessment | Assessment API |
| 75 | GET | `/api/Assessment/summaries/{studentId}` | Get assessment summaries for student | Assessment API |
| 76 | GET | `/api/Assessment/student-assessments-status` | Get student assessment status | Assessment API |
| 77 | GET | `/api/CreateTest/questions` | Get questions by concept | CreateTest API |
| 78 | POST | `/api/CreateTest/create` | Create a new test | CreateTest API |
| 79 | PUT | `/api/CreateTest/cancel/{id}` | Cancel a test | CreateTest API |
| 80 | POST | `/api/CreateTest/add-questions` | Add questions to test | CreateTest API |
| 81 | GET | `/api/CreateTest/20questions` | Get first 20 questions | CreateTest API |
| 82 | POST | `/api/auth/send-password` | Send one-time password | Auth API |
| 83 | POST | `/api/auth/verify-password` | Verify one-time password | Auth API |
| 84 | POST | `/api/Expertise/expertise` | Add SME expertise | Expertise API |
| 85 | GET | `/api/Questions/concepts` | Get all concepts | Questions (C#) API |
| 86 | GET | `/api/Questions/{assessmentId}/student/{studentId}` | Get student question results | Questions (C#) API |
| 87 | GET | `/api/Questions/{questionId}/answer` | Get question with answer | Questions (C#) API |
| 88 | GET | `/api/Questions/{questionId}` | Get question details | Questions (C#) API |
| 89 | GET | `/api/Score/GetAverageScoreById/{studentId}` | Get average score by student | Score API |
| 90 | GET | `/api/Score/GetAllStudentsAverageScore` | Get all students average scores | Score API |
| 91 | GET | `/api/Score/GetAssessmentResultData/{studentId}/{assessmentId}` | Get assessment score data | Score API |
| 92 | GET | `/api/StudentResult` | Get all student results | StudentResult API |
| 93 | GET | `/api/StudentResult/{studentId}/{assessmentId}/{questionId}` | Get student answer result | StudentResult API |
| 94 | GET | `/api/Students/total` | Get total students count | Students API |
| 95 | GET | `/api/Users/personal/{userId}` | Get user personal details | Users (C#) API |
| 96 | GET | `/api/Users/professional/{userId}` | Get user professional details | Users (C#) API |
| 97 | GET | `/api/Users/academic/{userId}` | Get user academic details | Users (C#) API |
| 98 | GET | `/api/Users/fullname/{userId}` | Get user full name | Users (C#) API |
| 99 | GET | `/api/Users/role/{userId}` | Get user roles | Users (C#) API |
| 100 | GET | `/api/UserSessions/all` | Get all user sessions | UserSessions API |
| 101 | GET | `/api/UserSessions/total-sessions` | Get total user sessions count | UserSessions API |