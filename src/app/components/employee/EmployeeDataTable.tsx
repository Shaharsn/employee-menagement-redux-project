import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Employee } from "../../types/types";
import { StyledTableCell, StyledTableRow } from "../styled/StyledTable";

interface IEmployeeDataTableProps {
  employees: Employee[];
  editEmployee: (employee: Employee) => void;
  deleteEmployee: (employee: Employee) => void;
  showEmployeeProject: (employee: Employee) => void;
}

const EmployeeDataTable = (props: IEmployeeDataTableProps) => {
  const { employees, editEmployee, deleteEmployee, showEmployeeProject } =
    props;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader  aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell sx={{ width: 150 }}>
                Assigned Projects
              </StyledTableCell>
              <StyledTableCell sx={{ width: 120 }} align="center">
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <StyledTableRow
                key={employee.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {employee.name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {employee.email}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {employee.role}
                </StyledTableCell>

                <StyledTableCell component="th" scope="row">
                  <Button
                    variant="text"
                    onClick={() => showEmployeeProject(employee)}
                  >
                    Projects
                  </Button>
                </StyledTableCell>

                <StyledTableCell component="th" scope="row" align="center">
                  <IconButton
                    aria-label="edit"
                    onClick={() => editEmployee(employee)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteEmployee(employee)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default EmployeeDataTable;
