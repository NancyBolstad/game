// FILE: dashboard.js

// From component folder
import { users, issues } from '../components';

// From layout folder
import { header, sidebar } from '../layouts'; 


class Dashboard {

  loadDashboard(){

    // Invoke methods
    users.loadUsers();
    issues.loadIssues();
    header.loadHeader();
    sidebar.loadSidebar();

    console.log('Dashboard component is loaded');
  }

}

export let dashboard = new Dashboard(); 