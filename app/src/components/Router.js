import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

/**
 * A tiny, dependency-free hash-based router.
 *
 * Why hash-based (e.g. /#/gallery instead of /gallery)?
 * This site is deployed as a static site on GitHub Pages, which has no
 * server-side rewrite rules. Hash routes always resolve correctly on
 * refresh or direct link share without any extra server configuration.
 */

const RouterContext = createContext(null);

function getCurrentPath() {
  const hash = window.location.hash || '#/';
  const path = hash.replace(/^#/, '');
  return path === '' ? '/' : path;
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const onHashChange = () => {
      setPath(getCurrentPath());
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((to) => {
    if (getCurrentPath() === to) return;
    window.location.hash = `#${to}`;
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within a RouterProvider');
  return ctx;
}

// Matches a path template like "/journal/:slug" against the current path.
function matchPath(template, path) {
  const templateParts = template.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);
  if (templateParts.length !== pathParts.length) return null;

  const params = {};
  for (let i = 0; i < templateParts.length; i++) {
    const t = templateParts[i];
    const p = pathParts[i];
    if (t.startsWith(':')) {
      params[t.slice(1)] = decodeURIComponent(p);
    } else if (t !== p) {
      return null;
    }
  }
  return params;
}

export function Routes({ children }) {
  const { path } = useRouter();
  const routeArray = React.Children.toArray(children);

  for (const route of routeArray) {
    if (route.props.path === '*') continue;
    const params = matchPath(route.props.path, path);
    if (params) {
      return React.cloneElement(route.props.element, { params });
    }
  }

  const fallback = routeArray.find((r) => r.props.path === '*');
  return fallback ? fallback.props.element : null;
}

export function Route() {
  // Route is a declarative marker consumed by <Routes>; it never renders directly.
  return null;
}

export function Link({ to, children, className, onClick, ...rest }) {
  const { navigate } = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };
  return (
    <a href={`#${to}`} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}

export function useActivePath(to) {
  const { path } = useRouter();
  if (to === '/') return path === '/';
  return path === to || path.startsWith(`${to}/`);
}
