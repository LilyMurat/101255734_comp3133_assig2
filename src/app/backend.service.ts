import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from './models/employee.model';

// Define GraphQL queries and mutations
const GET_SERVICES = gql`
  query employees {
    employees {
      id
      first_name
      last_name
      email
    }
  }
`;

const GET_SERVICE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      first_name
      last_name
      email
    }
  }
`;

const ADD_SERVICE = gql`
  mutation AddEmployee($first_name: String!, $last_name: String!, $email: String!) {
    addEmployee(first_name: $first_name, last_name: $last_name, email: $email) {
      id
      first_name
      last_name
      email
    }
  }
`;

const UPDATE_SERVICE = gql`
  mutation UpdateEmployee($id: ID!, $first_name: String, $last_name: String, $email: String) {
    updateEmployee(id: $id, first_name: $first_name, last_name: $last_name, email: $email) {
      id
      first_name
      last_name
      email
    }
  }
`;

const DELETE_SERVICE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private apollo: Apollo) { }

  getEmployees(): Observable<Employee[]> {
    return this.apollo.watchQuery<{ employees: Employee[] }>({
      query: GET_SERVICES,
    }).valueChanges.pipe(
      map(result => result.data.employees)
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.apollo.mutate<{ addEmployee: Employee }>({
      mutation: ADD_SERVICE,
      variables: employee,
      refetchQueries: [{ query: GET_SERVICES }],
    }).pipe(
      map(result => (result.data ? result.data.addEmployee : {} as Employee))
    );
  }

  deleteEmployee(id: string): Observable<string> {
    return this.apollo.mutate<{ deleteEmployee: string }>({
      mutation: DELETE_SERVICE,
      variables: { id },
      refetchQueries: [{ query: GET_SERVICES }],
    }).pipe(
      map(result => (result.data ? result.data.deleteEmployee : ''))
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.apollo.mutate<{ updateEmployee: Employee }>({
      mutation: UPDATE_SERVICE,
      variables: employee,
      refetchQueries: [{ query: GET_SERVICES }],
    }).pipe(
      map(result => (result.data ? result.data.updateEmployee : {} as Employee))
    );
  }

  getEmployee(id: string): Observable<Employee> {
    return this.apollo.watchQuery<{ employee: Employee }>({
      query: GET_SERVICE,
      variables: { id },
    }).valueChanges.pipe(
      map(result => result.data.employee)
    );
  }
}

