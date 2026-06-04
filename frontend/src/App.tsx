import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import { SelectionPage } from './subpages/SelectionPage.tsx';
import { ReviewPage } from './subpages/ReviewPage.tsx';
import { PracticePage } from './subpages/PracticePage.tsx';

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SelectionPage /> },
    { path: "/review", element: <ReviewPage /> },
    { path: "/practice", element: <PracticePage /> }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App