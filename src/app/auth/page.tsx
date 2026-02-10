import { redirect } from 'next/navigation';

export default function AuthIndexPage() {
  // Redirect index `/auth` to the login page for a better UX
  redirect('/auth/login');
}
