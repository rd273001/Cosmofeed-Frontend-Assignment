# TODO App

A powerful and interactive TODO application built using modern web technologies, designed for effective task management. The app emphasizes clean code practices, reusable components, and advanced functionality like global search with keyboard accessibility, providing an exceptional user experience.

---

## 🚀 Live Demo

Check the live version here: [TODO App](https://todo-management2.netlify.app)

---

## 📝👉 Features

- **CRUD Operations**: Create, Read, Update, and Delete tasks and manage your todo tasks efficiently.
- **Global Search**: Allowing users to quickly search tasks with `CTRL + F`, dynamically highlighting matching text and improving navigation.
- **Keyboard Accessibility**: Allowing users to navigate and interact with the app using keyboard shortcuts like `CTRL + F` and `ESC` for quick search and closing modals/alerts respectively, enhancing accessibility.
- **Confirm Before Save or Discard Changes**: Before saving or discarding changes, the app will prompt the user for confirmation, preventing accidental modifications.
- **Sorting & Group By Task**: Group tasks based on priority, due date, or created date.
- **Bulk Actions**: Perform bulk actions like mark as done, mark as pending, delete, for selected tasks.
- **Reusable Components & Custom Hooks**: Optimized codebase with modular and reusable components for different Modals or Alerts or adding listeners for any type of event or closing Modals/Alerts based on any event.
- **Persistent State**: Persistent state management with **redux-persist** ensures that tasks are saved across sessions, making the task data remain intact even after page refresh.
- **Priority Management**: Assign priority levels (None, High, Medium, Low) to tasks.
- **Responsive Design**: Optimized for different screen sizes and devices.

---

## 🛠️ Technologies Used

[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev) &nbsp;&nbsp; [![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/introduction/getting-started) &nbsp;&nbsp; [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) &nbsp;&nbsp; [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org) &nbsp;&nbsp; [![Vite](https://img.shields.io/badge/Vite-B73BFE?logo=vite&logoColor=FFD62E)](https://vite.dev/guide/)

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** and **npm** installed globally

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rd273001/TODO-App.git
   cd TODO-App
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend development server:**

   ```bash
   npm run dev
   ```

   OR

   ```bash
   yarn dev
   ```

4. **Access the application by navigating to <http://localhost:3000> in your browser.**

## Libraries and Dependencies

### Frontend

- **React:** Component-based library for building the user interface.
- **Redux:** State management library for managing global state.
- **Redux Toolkit:** Utility library for simplifying Redux setup and usage.
- **Vite:** Fast and lightweight development server for building and serving the frontend application.
- **TypeScript:** Superset of JavaScript that adds optional static typing and other features.

## 🔧 Future Enhancements / Improvements

- **Rich Text Editor:** Add a rich text editor component, like WYSIWYG, for detailed task descriptions.
- **Drag and Drop:** Enable drag-and-drop functionality for reorganizing tasks within or across categories.
- **Backend Integration:** Replace simulated async thunks with real API endpoints for CRUD operations.
- **Authentication/Authorisation:** Implement login/signup and restricted routes.

## Contributing

1. Fork the repository
2. Create a new branch: git checkout -b feature/YourFeature
3. Commit your changes: git commit -m 'New feature added'
4. Push to the branch: git push origin feature/YourFeature
5. Open a pull request

## License

This project is licensed under the MIT License.

## Please Star⭐=>🌟 the Repo if you like the Code, UI, or anything about the Project
