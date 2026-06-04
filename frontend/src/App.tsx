import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import { SelectionPage } from './subpages/SelectionPage.tsx';
import { ReviewPage } from './subpages/ReviewPage.tsx';
import { PracticePage } from './subpages/PracticePage.tsx';
/*wip: move the components above into their separate pages, and instead import each page.*/
/*import { BrowserRouter/HashRouter as Router, Routes, Route } from 'react-router-dom';*/

function App() {
  /* 
    to be honest, this is probably not very complicated. 
    just move everything into the selectionpage first, and then remove everything that is here, blud. 
  */
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