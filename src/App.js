import { NavLink, useLocation, useOutlet } from 'react-router-dom';
import { SwitchTransition } from 'react-transition-group';
import routes from './routes';
import CSSTransition from './containers/CSSTransition';

function App() {
  const location = useLocation();
  const outlet = useOutlet();
  const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {};
  // console.log(nodeRef);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-black text-lime-200 font-sans overflow-hidden">
      <div>
        {routes.map(({ path, label }) => (label ? (
          <NavLink
            key={`nav-link-${path}`}
            to={path}
          >
            {label}
          </NavLink>
        ) : null))}
      </div>
      <div className="flex flex-col justify-start items-center flex-1 w-full md:w-4/5 xl:w-2/3 relative border-2 rounded-md border-slate-500">
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={100}
            classNames="page"
            unmountOnExit
          >
            <div ref={nodeRef} className="page flex-1 flex flex-col justify-start items-center">
              {outlet}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}

export default App;
