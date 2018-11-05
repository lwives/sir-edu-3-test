import { browserHistory } from 'react-router';
import { StudentList } from '../routes/Student/StudentList'
import { StudentMenu } from '../routes/Student/StudentMenu'

export default class RouterHelper {
    static goToStudentsPage() {
        browserHistory.push(StudentList.pathWithoutParam);
    }
    static goToStudentMenuPage(studentId) {
        console.log('/alunos/' + studentId);
        browserHistory.push('/alunos/' + studentId);
    }
}
