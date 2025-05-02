export type NavItem = {
  label: string;
  href: string;
};

export type ServiceCardProps = {
  title: string;
  description: string;
};

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  href?: string;
};

export type FormData = {
  name: string;
  email: string;
  restaurant: string;
  message: string;
};