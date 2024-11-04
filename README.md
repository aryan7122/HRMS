
# React + Vite Project =  HRMS

💻📍  https://task-add-em.vercel.app

This project is a React application bootstrapped with Vite, providing a minimal setup with hot module replacement (HMR) and ESLint rules to maintain code quality. It also supports SCSS for styling.

## Folder Structure

Here’s a breakdown of the folder structure used in this project:

```
node_modules/          # NPM packages ka folder, automatically generate hota hai after npm install.
public/               # Static assets jaise favicon, index.html, aur images ke liye.
src/                  # Main application code yaha rakha jata hai.
   ├── api/           # API call related functions, jaise fetch, axios requests yaha rakhe jayenge.
   ├── assets/        # Static assets like images, fonts, etc. for the project.
   ├── components/    # Reusable React components jo multiple places pe use ho sakte hain.
   ├── Pages/         # Different pages ka code, like Home, About, etc. (All website pages).
   ├── slices/        # Redux slices (for state management) ko yaha rakha jata hai (reusable but related api).
   ├── Snippet/       # Reusable code snippets ya small helper functions jo baar baar use ho sakte hain.
   ├── styles/        # SCSS/CSS stylesheets ke liye, centralized styling rakha jata hai yaha.
   ├── utils/         # Page related reusable functions
   ├── Views/         # High-level views ya page-specific components yaha rakhe jate hain.
   ├── App.jsx        # Root App component, yahi component render hota hai initially.
   ├── main.jsx       # Main entry point for the React app, ReactDOM.render ya createRoot yaha hota hai.
   ├── store.js       # Redux store ka configuration yaha hota hai (agar Redux use kar rahe ho).
   ├── variables.scss # Global SCSS variables like colors, fonts, spacing ke liye.
.env                  # Environment variables ke liye file, jaise API keys.
.eslintrc.cjs         # ESLint configuration file for code linting.
.gitignore            # Files aur folders jo Git me track nahi hone chahiye, unka list.
.npmrc                # NPM ke configuration settings (proxy, registry, etc.)
index.html            # Entry point HTML file jo `public/` me rakha jata hai.
package.json          # Project metadata, dependencies, and scripts.
package-lock.json     # Exact versions of installed packages ko lock karta hai.
README.md             # Project ke baare me documentation yaha hota hai.
vercel.json           # Vercel deployment ke configuration ke liye file.
vite.config.js        # Vite bundler configuration file for dev server, build settings.

```

### Explanation of Folders

- **node_modules/**: Contains all the dependencies required for the project.
  
- **public/**: Contains static files such as images, fonts, and other public assets that don’t require processing by Webpack or Vite.

- **src/**: Main folder where all the source code of the application resides.
  
  - **api/**: This folder is intended to store all API-related calls and configurations. Any fetch requests or Axios calls can be stored here.

  - **assets/**: Contains static files such as images, icons, fonts, or other resources that are used in the application.

  - **components/**: Houses reusable UI components that can be used across the application, like buttons, modals, form elements, etc.

  - **Pages/**: Each React page (or view) is located here, typically representing different routes in your app.

  - **slices/**: Redux slices or other state management logic can be placed here.

  - **Snippet/**: Contains small code snippets or utility functions that are shared across components.

  - **styles/**: Contains global SCSS/CSS files. For example, `variables.scss` might include variables for colors, typography, and spacing that can be used throughout your app.

  - **Views/**: This folder is used to organize more complex views, which could be combinations of components and pages.

  - **App.jsx**: The root React component where all other components and routes are rendered.

  - **main.jsx**: The entry point of the React application. This is where the `ReactDOM.render()` method is called to render the app into the HTML DOM.

  - **store.js**: Manages the global state of the application using Redux or any other state management library.

  - **variables.scss**: SCSS variables that hold the theme colors, font sizes, and other design-related constants.

### Configuration Files

- **.env**: Contains environment variables used across the project.

- **.eslintrc.cjs**: Configuration for ESLint, ensuring code quality and maintaining consistent code styles.

- **.gitignore**: Specifies which files and directories should be ignored by Git when committing the code.

- **.npmrc**: Custom NPM configuration settings.

- **index.html**: The main HTML file that gets served. This is where the root `div` resides, and the React app gets mounted here.

- **package.json**: Lists project dependencies, scripts, and configurations for package management.

- **package-lock.json**: Ensures that the same package versions are installed on different environments.

- **vercel.json**: Configuration file for Vercel deployment.

- **vite.config.js**: Configuration file for Vite, where custom build and dev server settings are defined.

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. To build the project for production:
   ```bash
   npm run build
   ```

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast frontend build tool and development server.
- **SCSS**: Syntactically Awesome Style Sheets, a CSS preprocessor.
- **Redux (optional)**: For state management, used if the `slices/` folder is implemented.
  
## Deployment

This project is configured to deploy on Vercel. If you wish to deploy, run the following command:

```bash
vercel
```
