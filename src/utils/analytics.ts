import ReactGA from 'react-ga4';

export const initGA = () => {
  const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
  
  if (!trackingId) {
    console.warn('Google Analytics tracking ID not found. Analytics will be disabled.');
    return;
  }
  
  ReactGA.initialize(trackingId);
};

export const logPageView = () => {
  if (!import.meta.env.VITE_GA_TRACKING_ID) return;
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (category: string, action: string) => {
  if (!import.meta.env.VITE_GA_TRACKING_ID) return;
  ReactGA.event({
    category,
    action,
  });
};