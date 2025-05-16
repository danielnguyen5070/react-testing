import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Counter from './components/counter';
import Sidebar from './components/Sidebar';
import EasyButton from './examples/easy-button';
import Location from './examples/location';
import LoginSubmission from './components/login-submission';
import Login from './components/login';

const routes = [
  { path: "/counter-hook", element: <Counter /> },
  { path: "/counter", element: <Counter /> },
  { path: "/easy-button", element: <EasyButton /> },
  { path: "/location", element: <Location /> },
  { path: "/login-submission", element: <LoginSubmission /> },
  { path: "/login", element: <Login onSubmit={() => { }} /> },
];

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="ml-64 p-6 flex-1">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
