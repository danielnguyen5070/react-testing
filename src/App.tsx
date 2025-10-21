import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Counter from './examples/counter';
import CounterHook from './examples/counter-hook';
import Sidebar from './components/Sidebar';
import EasyButton from './examples/easy-button';
import Location from './examples/location';
import LoginSubmission from './examples/login-submission';
import Login from './examples/login';

const routes = [
  { path: "/counter", element: <Counter /> },
  { path: "/login", element: <Login /> },
  { path: "/easy-button", element: <EasyButton /> },
  { path: "/location", element: <Location /> },
  { path: "/login-submission", element: <LoginSubmission /> },
  { path: "/counter-hook", element: <CounterHook /> },
];

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1">
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
