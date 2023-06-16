import { NavLink, useLocation, useOutlet } from 'react-router-dom';
import { SwitchTransition } from 'react-transition-group';
import routes from './routes';
import CSSTransition from './containers/CSSTransition';

function App() {
  const location = useLocation();
  const outlet = useOutlet();
  const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {};

  return (
    <div className="w-full h-full col justify-center items-center bg-white text-black font-sans overflow-hidden">
      <div className="row">
        {routes.map(({ path, label }) => (label ? (
          <NavLink
            className="mx-2 my-1 p-1 text-cornflower-blue font-bold text-3xl font-cursive hover:underline"
            key={`nav-link-${path}`}
            to={path}
          >
            {label}
          </NavLink>
        ) : null))}
      </div>
      <div className="col justify-start items-center flex-1 w-full md:w-4/5 xl:w-2/3 relative border-2 rounded-md border-cornflower-blue">
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={100}
            classNames="page"
            unmountOnExit
          >
            <div ref={nodeRef} className="page flex-1 col justify-start items-center">
              {outlet}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}

export default App;
