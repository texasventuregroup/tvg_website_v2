import { redirect } from 'next/navigation';
import { APPLY_FORM_URL } from '../config/apply';

export default function Analysts() {
  redirect(APPLY_FORM_URL);
}
