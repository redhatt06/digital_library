import './App.css';
import HomeScreen from './screens/PublicScreens/HomeScreen';
import ManagementScreen from './screens/PrivateScreens/ManagementScreen.js';
import AddBookScreen from './screens/PrivateScreens/AddBookScreen';
import LoginScreen from './screens/PublicScreens/LoginScreen';
import ManageBooksScreen from './screens/PrivateScreens/ManageBooksScreen.js';
import ManageAuthorsScreen from './screens/PrivateScreens/ManageAuthorsScreen.js';
import NavBar from './components/NavBar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routing/PrivateRoute.js';
import BookListScreen from './screens/PublicScreens/BookListScreen';
import AuthorListScreen from './screens/PublicScreens/AuthorListScreen';

function App() {
  return (
    <Router>
      <NavBar></NavBar>

      <div className="App">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/books" element={<BookListScreen />} />
          <Route path="/authors" element={<AuthorListScreen />} />
          <Route element={<PrivateRoute />}>
            <Route path="/addbook" element={<AddBookScreen />} />
            <Route path="/management" element={<ManagementScreen />} />
            <Route path="/managebooks" element={<ManageBooksScreen />} />
            <Route path="/manageauthors" element={<ManageAuthorsScreen />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
